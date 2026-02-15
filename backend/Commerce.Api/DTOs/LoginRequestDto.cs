namespace Commerce.Api.DTOs;

public class LoginRequestDto //DTO for login requests, it contains the email and password of the user trying to log in
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}
