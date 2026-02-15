using Commerce.Api.Helpers;
using Commerce.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Data;

public static class DbSeeder // a static class that seeds the database with initial data, such as default roles and an admin user. It ensures that the database is created and migrated before seeding data.
{
    public static async Task SeedAsync(AppDbContext db)
    {
        await db.Database.MigrateAsync(); //applies any pending migrations to the database, ensuring that the database schema is up to date before seeding data

        if (!await db.Roles.AnyAsync())
        {
            db.Roles.AddRange(
                new Role { Name = "ADMIN" },
                new Role { Name = "USER" }
            );
            await db.SaveChangesAsync();
        }

        var adminRole = await db.Roles.FirstAsync(r => r.Name == "ADMIN");

        // Create a default admin if not exists
        var adminEmail = "admin@commerce.com";
        var adminExists = await db.Users.AnyAsync(u => u.Email == adminEmail);

        if (!adminExists)
        {
            db.Users.Add(new User
            {
                Email = adminEmail,
                PasswordHash = PasswordHelper.Hash("Admin@123"),
                Provider = "LOCAL",
                RoleId = adminRole.Id
            });
            await db.SaveChangesAsync();
        }
    }
}
