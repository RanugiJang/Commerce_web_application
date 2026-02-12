namespace Commerce.Api.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string? PasswordHash { get; set; }
    public string Provider { get; set; } = "LOCAL"; // LOCAL / GOOGLE

    public int RoleId { get; set; }
    public Role? Role { get; set; }
}
