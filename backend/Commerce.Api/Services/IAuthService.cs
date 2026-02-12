using Commerce.Api.DTOs;

namespace Commerce.Api.Services;

public interface IAuthService
{
    Task<AuthResponseDto> GoogleLoginAsync(GoogleLoginRequestDto req);
    Task<AuthResponseDto> LoginAsync(LoginRequestDto req);
    Task<AuthResponseDto> RegisterAsync(RegisterRequestDto req);
}

