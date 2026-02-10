namespace Commerce.Api.DTOs;

// Used for login (Admin/User)
public class LoginRequestDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}