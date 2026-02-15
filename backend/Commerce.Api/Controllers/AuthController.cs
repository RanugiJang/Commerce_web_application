using Commerce.Api.DTOs;
using Commerce.Api.Services;
using Microsoft.AspNetCore.Mvc;
 
namespace Commerce.Api.Controllers;

//authController handles authentiaction
//returns JWT token on successful login or registration

[ApiController] //base route for all endpoints in this controller will be /api/auth (returns 400 bad request if model validation fails)
[Route("api/[controller]")] //defines the URL path for the controller
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService; //service for handling authentication logic

    
    public AuthController(IAuthService authService)       
    {
        _authService = authService;
    }

    
    // REGISTER (LOCAL USER)
    
    [HttpPost("register")] 
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterRequestDto request)
    {
        try
        {
            var result = await _authService.RegisterAsync(request);
            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    
    // LOGIN (LOCAL USER / ADMIN)
    
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto request) //accepts login credentials in the request body and returns a JWT token if successful
    {
        try
        {
            var result = await _authService.LoginAsync(request);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    
    // GOOGLE LOGIN
    
    [HttpPost("google")]
    public async Task<ActionResult<AuthResponseDto>> GoogleLogin([FromBody] GoogleLoginRequestDto request)
    {
        try
        {
            var result = await _authService.GoogleLoginAsync(request); //accepts a Google token in the request body, validates it, and returns a JWT token if successful
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex) //if the Google token is invalid or expired, return 401 Unauthorized with the error message
        {
            return Unauthorized(ex.Message);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message); 
        }
    }
}
