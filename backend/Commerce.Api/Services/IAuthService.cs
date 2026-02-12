using Commerce.Api.DTOs;

namespace Commerce.Api.Services;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterRequestDto req);
    Task<AuthResponseDto> LoginAsync(LoginRequestDto req);
    Task<AuthResponseDto> GoogleLoginAsync(GoogleLoginRequestDto req);
}
