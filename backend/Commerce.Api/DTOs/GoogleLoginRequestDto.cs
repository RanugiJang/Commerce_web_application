namespace Commerce.Api.DTOs;

public class GoogleLoginRequestDto
{
    public string Credential { get; set; } = string.Empty; // ID token from Google
}
