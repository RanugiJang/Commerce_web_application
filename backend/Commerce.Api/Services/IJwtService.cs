namespace Commerce.Api.Services;

public interface IJwtService
{
    string CreateToken(string email, string role);
}
