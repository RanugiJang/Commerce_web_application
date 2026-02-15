namespace Commerce.Api.DTOs;

public class AuthResponseDto //DTO for authentication responses, it contains the JWT token, email, and role of the authenticated user
{
    public string Token { get; set; } = "";
    public string Email { get; set; } = "";
    public string Role { get; set; } = "";
}
