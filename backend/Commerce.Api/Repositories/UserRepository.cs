using Commerce.Api.Data;
using Commerce.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _db;

    public UserRepository(AppDbContext db)
    {
        _db = db;
    }

    public Task<User?> GetByEmailAsync(string email)
        => _db.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == email);

    public async Task AddAsync(User user)
    {
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
    }
}
