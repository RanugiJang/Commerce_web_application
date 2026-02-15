using Commerce.Api.Models;

namespace Commerce.Api.Repositories;

public interface IItemRepository //Interface for item repository, it contains methods for CRUD operations on items
{
    Task<List<Item>> GetAllAsync();        //Method to get all items, it returns a list of items
    Task<Item?> GetByIdAsync(int id);
    Task<Item> CreateAsync(Item item);
    Task<Item?> UpdateAsync(Item item);
    Task<bool> DeleteAsync(int id);
}
