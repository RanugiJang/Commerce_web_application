using Commerce.Api.Data;
using Commerce.Api.DTOs;
using Commerce.Api.Helpers;
using Commerce.Api.Models;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Commerce.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    // =========================
    // REGISTER (LOCAL)
    // =========================
    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto req)
    {
        var email = (req.Email ?? "").Trim().ToLower();
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(req.Password))
            throw new ArgumentException("Email and Password are required.");

        var exists = await _db.Users.AnyAsync(u => u.Email == email);
        if (exists) throw new ArgumentException("User already exists.");

        var roleName = (req.Role ?? "USER").Trim().ToUpper();
        var role = await _db.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
        if (role is null) throw new ArgumentException("Invalid role. Use ADMIN or USER.");

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
        return new AuthResponseDto { Token = token, Email = user.Email, Role = role.Name };
    }

    // =========================
    // LOGIN (LOCAL)
    // =========================
    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto req)
    {
        var email = (req.Email ?? "").Trim().ToLower();

        var user = await _db.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user is null)
            throw new UnauthorizedAccessException("Invalid credentials.");

        if (user.Provider != "LOCAL")
            throw new UnauthorizedAccessException("Use Google login for this account.");

        if (string.IsNullOrWhiteSpace(user.PasswordHash) || !PasswordHelper.Verify(req.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials.");

        var roleName = user.Role?.Name ?? "USER";
        var token = CreateJwtToken(user.Email, roleName);

        return new AuthResponseDto { Token = token, Email = user.Email, Role = roleName };
    }

    // =========================
    // GOOGLE LOGIN (FIXED TIMEOUT)
    // =========================
    public async Task<AuthResponseDto> GoogleLoginAsync(GoogleLoginRequestDto req)
    {
        if (string.IsNullOrWhiteSpace(req.Credential))
            throw new ArgumentException("Missing google credential.");

        var googleClientId = _config["Google:ClientId"];
        if (string.IsNullOrWhiteSpace(googleClientId))
            throw new Exception("Google:ClientId missing in appsettings.json");

        GoogleJsonWebSignature.Payload payload;

        try
        {
            payload = await GoogleJsonWebSignature.ValidateAsync(
                req.Credential,
                new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { googleClientId },

                    
                    
                }
            );
        }
        catch (Exception ex)
        {
            throw new UnauthorizedAccessException("Invalid Google token: " + ex.Message);
        }

        var email = payload.Email.Trim().ToLower();

        // Ensure USER role exists
        var role = await _db.Roles.FirstOrDefaultAsync(r => r.Name == "USER");
        if (role == null) throw new ArgumentException("USER role missing in DB.");

        // Find or create user
        var user = await _db.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
        {
            user = new User
            {
                Email = email,
                PasswordHash = null,
                RoleId = role.Id,
                Provider = "GOOGLE"
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            user.Role = role;
        }

        var roleName = user.Role?.Name ?? "USER";
        var token = CreateJwtToken(user.Email, roleName);

        return new AuthResponseDto
        {
            Token = token,
            Email = user.Email,
            Role = roleName
        };
    }

    // =========================
    // JWT helper
    // =========================
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
