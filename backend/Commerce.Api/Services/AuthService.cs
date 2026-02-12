using Commerce.Api.Data;
using Commerce.Api.DTOs;
using Commerce.Api.Helpers;
using Commerce.Api.Models;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;
    private readonly IJwtService _jwt;

    public AuthService(AppDbContext db, IConfiguration config, IJwtService jwt)
    {
        _db = db;
        _config = config;
        _jwt = jwt;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto req)
    {
        var email = (req.Email ?? "").Trim().ToLower();
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(req.Password))
            throw new ArgumentException("Email and Password are required.");

        if (await _db.Users.AnyAsync(u => u.Email == email))
            throw new ArgumentException("User already exists.");

        var userRole = await _db.Roles.FirstAsync(r => r.Name == "USER");

        var user = new User
        {
            Email = email,
            PasswordHash = PasswordHelper.Hash(req.Password),
            Provider = "LOCAL",
            RoleId = userRole.Id
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        var token = _jwt.CreateToken(user.Email, "USER");
        return new AuthResponseDto { Token = token, Email = user.Email, Role = "USER" };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto req)
    {
        var email = (req.Email ?? "").Trim().ToLower();

        var user = await _db.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) throw new UnauthorizedAccessException("Invalid credentials.");

        if (user.Provider != "LOCAL") throw new UnauthorizedAccessException("Use Google login for this account.");

        if (string.IsNullOrWhiteSpace(user.PasswordHash) || !PasswordHelper.Verify(req.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials.");

        var role = (user.Role?.Name ?? "USER").ToUpper();
        var token = _jwt.CreateToken(user.Email, role);

        return new AuthResponseDto { Token = token, Email = user.Email, Role = role };
    }

    public async Task<AuthResponseDto> GoogleLoginAsync(GoogleLoginRequestDto req)
    {
        if (string.IsNullOrWhiteSpace(req.Credential))
            throw new ArgumentException("Missing google credential.");

        var googleClientId = _config["Google:ClientId"];
        if (string.IsNullOrWhiteSpace(googleClientId))
            throw new Exception("Google ClientId missing in appsettings.json");

        GoogleJsonWebSignature.Payload payload;

        try
        {
            payload = await GoogleJsonWebSignature.ValidateAsync(req.Credential,
                new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { googleClientId }
                });
        }
        catch (Exception ex)
        {
            throw new UnauthorizedAccessException("Invalid Google token: " + ex.Message);
        }

        var email = payload.Email.Trim().ToLower();
        var userRole = await _db.Roles.FirstAsync(r => r.Name == "USER");

        var user = await _db.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
        {
            user = new User
            {
                Email = email,
                Provider = "GOOGLE",
                PasswordHash = null,
                RoleId = userRole.Id
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
        }

        var token = _jwt.CreateToken(user.Email, "USER");
        return new AuthResponseDto { Token = token, Email = user.Email, Role = "USER" };
    }
}
