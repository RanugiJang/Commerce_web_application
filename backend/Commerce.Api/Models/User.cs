namespace Commerce.Api.Models;

public class User //Model class for users, it contains the id, email, password hash, provider, and role of a user. The provider can be either "LOCAL" or "GOOGLE". The role is a foreign key to the Role model.
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string? PasswordHash { get; set; }
    public string Provider { get; set; } = "LOCAL"; // LOCAL / GOOGLE

    public int RoleId { get; set; }
    public Role? Role { get; set; }
}
