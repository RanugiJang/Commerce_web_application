using Commerce.Api.Models;

namespace Commerce.Api.Repositories;

public interface IUserRepository //Interface for user repository, it contains methods to get a user by email and to add a new user to the database
{
    Task<User?> GetByEmailAsync(string email);
    Task AddAsync(User user);
}
