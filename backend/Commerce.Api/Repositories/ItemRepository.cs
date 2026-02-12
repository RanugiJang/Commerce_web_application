using Commerce.Api.Data;
using Commerce.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Repositories;

public class ItemRepository : IItemRepository
{
    private readonly AppDbContext _db;

    public ItemRepository(AppDbContext db)
    {
        _db = db;
    }

    public Task<List<Item>> GetAllAsync()
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
