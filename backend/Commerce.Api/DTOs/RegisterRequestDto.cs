namespace Commerce.Api.DTOs;

public class RegisterRequestDto
{
    internal string? Role;

    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}
