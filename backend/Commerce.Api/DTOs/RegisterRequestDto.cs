namespace Commerce.Api.DTOs;

//used for creating users
public class RegisterRequestDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public String Role { get; set; } = "USER";
}