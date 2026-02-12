using Commerce.Api.Data;
using Commerce.Api.DTOs;
using Commerce.Api.Helpers;
using Commerce.Api.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Commerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")] // /api/auth
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    // POST: /api/auth/register
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterRequestDto req)
    {
        var email = (req.Email ?? "").Trim().ToLower();

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(req.Password))
            return BadRequest("Email and Password are required.");

        var exists = await _db.Users.AnyAsync(u => u.Email == email);
        if (exists) return Conflict("User already exists.");

        var roleName = (req.Role ?? "USER").Trim().ToUpper();
        var role = await _db.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
        if (role is null) return BadRequest("Invalid role. Use ADMIN or USER.");

        var user = new User
        {
            Email = email,
            PasswordHash = PasswordHelper.Hash(req.Password),
            RoleId = role.Id,
            Provider = "LOCAL"
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        var token = CreateJwtToken(user.Email, role.Name);
        return Ok(new AuthResponseDto { Token = token, Email = user.Email, Role = role.Name });
    }

    // POST: /api/auth/login
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto req)
    {
        var email = (req.Email ?? "").Trim().ToLower();

        var user = await _db.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user is null) return Unauthorized("Invalid credentials.");

        // only LOCAL users can login with password
        if (user.Provider != "LOCAL")
            return Unauthorized("Use Google login for this account.");

        if (string.IsNullOrWhiteSpace(user.PasswordHash) || !PasswordHelper.Verify(req.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials.");

        var roleName = user.Role?.Name ?? "USER";
        var token = CreateJwtToken(user.Email, roleName);

        return Ok(new AuthResponseDto { Token = token, Email = user.Email, Role = roleName });
    }

    // POST: /api/auth/google
    // Frontend sends Google ID token as { "credential": "<id_token>" }
  [HttpPost("google")]
public async Task<ActionResult<AuthResponseDto>> GoogleLogin(GoogleLoginRequestDto req)
{
    if (string.IsNullOrWhiteSpace(req.Credential))
        return BadRequest("Missing google credential.");

    GoogleJsonWebSignature.Payload payload;

    try
    {
        payload = await GoogleJsonWebSignature.ValidateAsync(req.Credential, new GoogleJsonWebSignature.ValidationSettings
        {
            Audience = new[] { _config["Google:ClientId"] }
        });
    }
    catch
    {
        return Unauthorized("Invalid Google token.");
    }

    var email = payload.Email.Trim().ToLower();

    // Ensure USER role exists
    var role = await _db.Roles.FirstOrDefaultAsync(r => r.Name == "USER");
    if (role == null) return BadRequest("USER role missing in DB.");

    // Find or create user
    var user = await _db.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == email);

    if (user == null)
    {
        user = new User
        {
            Email = email,
            PasswordHash = null, // Google users don't have local password
            RoleId = role.Id,
            Provider = "GOOGLE"
        };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        // reload role
        user.Role = role;
    }

    var roleName = user.Role?.Name ?? "USER";
    var token = CreateJwtToken(user.Email, roleName);

    return Ok(new AuthResponseDto
    {
        Token = token,
        Email = user.Email,
        Role = roleName
    });
}


    // GET: /api/auth/test
    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("Auth controller works");
    }

    // ===================== JWT helper =====================
    private string CreateJwtToken(string email, string role)
    {
        var key = _config["Jwt:Key"];
        var issuer = _config["Jwt:Issuer"];
        var audience = _config["Jwt:Audience"];
        var expiresMinutesStr = _config["Jwt:ExpiresMinutes"];

        if (string.IsNullOrWhiteSpace(key) ||
            string.IsNullOrWhiteSpace(issuer) ||
            string.IsNullOrWhiteSpace(audience) ||
            string.IsNullOrWhiteSpace(expiresMinutesStr))
        {
            throw new Exception("JWT config missing. Check appsettings.json Jwt section.");
        }

        var expiresMinutes = int.Parse(expiresMinutesStr);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, email),
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Role, role)
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
