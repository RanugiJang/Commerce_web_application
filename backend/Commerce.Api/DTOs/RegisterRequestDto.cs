namespace Commerce.Api.DTOs;

public class RegisterRequestDto //DTO for registration requests, it contains the email, password, and role of the user trying to register
{
    internal string? Role;

    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}
