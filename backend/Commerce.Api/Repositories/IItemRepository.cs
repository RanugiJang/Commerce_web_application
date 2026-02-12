using Commerce.Api.Models;

namespace Commerce.Api.Repositories;

public interface IItemRepository
{
    Task<List<Item>> GetAllAsync();
    Task<Item?> GetByIdAsync(int id);
    Task<Item> CreateAsync(Item item);
    Task<Item?> UpdateAsync(Item item);
    Task<bool> DeleteAsync(int id);
}
