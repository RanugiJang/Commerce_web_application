using Commerce.Api.Data;
using Commerce.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Repositories;

public class ItemRepository : IItemRepository //Implementation of the IItemRepository interface, it uses the AppDbContext to perform CRUD operations on items in the database
{
    private readonly AppDbContext _db;

    public ItemRepository(AppDbContext db)
    {
        _db = db;
    }

    public Task<List<Item>> GetAllAsync() //Method to get all items, it returns a list of items ordered by id in descending order
        => _db.Items.OrderByDescending(i => i.Id).ToListAsync();
    public Task<Item?> GetByIdAsync(int id) 
        => _db.Items.FirstOrDefaultAsync(i => i.Id == id);

    public async Task<Item> CreateAsync(Item item)
    {
        _db.Items.Add(item);
        await _db.SaveChangesAsync();
        return item;
    }

    public async Task<Item?> UpdateAsync(Item item)
    {
        _db.Items.Update(item);
        await _db.SaveChangesAsync();
        return item;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var item = await _db.Items.FindAsync(id);
        if (item == null) return false;

        _db.Items.Remove(item);
        await _db.SaveChangesAsync();
        return true;
    }
}
