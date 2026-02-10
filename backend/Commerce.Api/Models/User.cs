namespace Commerce.Api.Models;

// User entity represents application users
public class User
{
  
    public int Id { get; set; }

    public string Email { get; set; } = string.Empty;

    // Password hash (null for Google-auth users)
    public string? PasswordHash { get; set; }

    // Foreign key linking to Role table
    public int RoleId { get; set; }

    // Navigation property (EF Core uses this for joins)
    public Role? Role { get; set; }

    // Authentication provider
    // LOCAL  -> Email & password
    // GOOGLE -> Google OAuth
    public string Provider { get; set; } = "LOCAL";
}
