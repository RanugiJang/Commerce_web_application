using Commerce.Api.Data;
using Commerce.Api.DTOs;
using Commerce.Api.Helpers;
using Commerce.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Commerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    // POST: /api/Auth/register
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterRequestDto req)
    {
        var email = req.Email.Trim().ToLower();

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

        return Ok(new AuthResponseDto
        {
            Token = token,
            Email = user.Email,
            Role = role.Name
        });
    }

    // POST: /api/Auth/login
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto req)
    {
        var email = req.Email.Trim().ToLower();

        var user = await _db.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user is null) return Unauthorized("Invalid credentials.");

        if (user.PasswordHash is null || !PasswordHelper.Verify(req.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials.");

        var roleName = user.Role?.Name ?? "USER";
        var token = CreateJwtToken(user.Email, roleName);

        return Ok(new AuthResponseDto
        {
            Token = token,
            Email = user.Email,
            Role = roleName
        });
    }

    // GET: /api/Auth/me  (needs token)
    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        var email = User.FindFirstValue(ClaimTypes.Email) ?? User.Identity?.Name;
        var role = User.FindFirstValue(ClaimTypes.Role);
        return Ok(new { email, role });
    }

    private string CreateJwtToken(string email, string role)
    {
        var key = _config["Jwt:Key"]!;
        var issuer = _config["Jwt:Issuer"]!;
        var audience = _config["Jwt:Audience"]!;
        var expiresMinutes = int.Parse(_config["Jwt:ExpiresMinutes"]!);

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
