using Commerce.Api.DTOs;
using Commerce.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Commerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;

    public AuthController(IAuthService auth)
    {
        _auth = auth;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterRequestDto req)
    {
        try
        {
            return Ok(await _auth.RegisterAsync(req));
        }
        catch (ArgumentException ex) { return BadRequest(ex.Message); }
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginRequestDto req)
    {
        try
        {
            return Ok(await _auth.LoginAsync(req));
        }
        catch (UnauthorizedAccessException ex) { return Unauthorized(ex.Message); }
    }

    [HttpPost("google")]
    public async Task<ActionResult<AuthResponseDto>> Google(GoogleLoginRequestDto req)
    {
        try
        {
            return Ok(await _auth.GoogleLoginAsync(req));
        }
        catch (UnauthorizedAccessException ex) { return Unauthorized(ex.Message); }
        catch (ArgumentException ex) { return BadRequest(ex.Message); }
    }

    
}
