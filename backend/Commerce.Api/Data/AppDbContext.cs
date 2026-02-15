using Commerce.Api.Models; //data models for users, roles, and items
using Microsoft.EntityFrameworkCore; //EF Core ORM for database access

namespace Commerce.Api.Data;      //AppDbContext is the EF Core database context for the application, it manages the database connection and provides DbSet properties for each entity type (User, Role, Item)

public class AppDbContext : DbContext //inherits from DbContext, which is the base class for EF Core database contexts
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { } //constructor that accepts DbContextOptions and passes it to the base DbContext class

    public DbSet<User> Users => Set<User>(); //these represent the tables in the database and allow querying and saving instances of these entities
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Item> Items => Set<Item>();
}
