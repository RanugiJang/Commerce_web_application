namespace Commerce.Api.DTOs;

public class GoogleLoginRequestDto //DTO for Google login requests, it contains the credential property which is the ID token from Google
{
    public string Credential { get; set; } = string.Empty; // ID token from Google
}
