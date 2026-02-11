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

    public async Task<List<Item>> GetAllAsync()
        => await _db.Items.ToListAsync();

    public async Task<Item?> GetByIdAsync(int id)
        => await _db.Items.FirstOrDefaultAsync(i => i.Id == id);

    public async Task<Item> CreateAsync(Item item)
    {
        _db.Items.Add(item);
        await _db.SaveChangesAsync();
        return item;
    }

    public async Task<bool> UpdateAsync(Item item)
    {
        _db.Items.Update(item);
        return await _db.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteAsync(Item item)
    {
        _db.Items.Remove(item);
        return await _db.SaveChangesAsync() > 0;
    }

    public Task<Item> AddAsync(Item item)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}
