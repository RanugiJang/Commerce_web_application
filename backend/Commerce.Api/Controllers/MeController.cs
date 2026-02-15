using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Commerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")] 
public class MeController : ControllerBase 
{
    [Authorize]
    [HttpGet] //get current user info, requires authentication, returns 200 OK with the email and role of the authenticated user
    public IActionResult GetMe() //returns the email and role of the currently authenticated user, requires authentication
    {
        var email = User.FindFirstValue(ClaimTypes.Email); 
        var role = User.FindFirstValue(ClaimTypes.Role);
        return Ok(new { email, role });
    }
}
