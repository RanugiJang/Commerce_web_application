using Commerce.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Data;

// DbContext is the main EF Core class that connects your C# models to DB tables
public class AppDbContext : DbContext
{
    // DbContextOptions contains DB connection/config settings passed from Program.cs
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // These DbSets become tables in MySQL when you run migrations
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Item> Items {get; set;}
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }

}
