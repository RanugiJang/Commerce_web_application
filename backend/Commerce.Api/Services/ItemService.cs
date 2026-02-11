using Commerce.Api.Data;
using Commerce.Api.DTOs;
using Commerce.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Services;

public class ItemService : IItemService
{
    private readonly AppDbContext _db;

    public ItemService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<ItemResponseDto> CreateAsync(CreateItemRequestDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
            throw new ArgumentException("Name is required.");

        if (dto.Rate < 0) throw new ArgumentException("Rate cannot be negative.");
        if (dto.Quantity < 0) throw new ArgumentException("Quantity cannot be negative.");

        var item = new Item
        {
            Name = dto.Name.Trim(),
            Rate = dto.Rate,
            Quantity = dto.Quantity
        };

        _db.Items.Add(item);
        await _db.SaveChangesAsync();

        return ToDto(item);
    }

    public async Task<List<ItemResponseDto>> GetAllAsync()
    {
        var items = await _db.Items.AsNoTracking().ToListAsync();
        return items.Select(ToDto).ToList();
    }

    public async Task<ItemResponseDto?> GetByIdAsync(int id)
    {
        var item = await _db.Items.AsNoTracking().FirstOrDefaultAsync(i => i.Id == id);
        return item == null ? null : ToDto(item);
    }

    public async Task<ItemResponseDto?> UpdateAsync(int id, UpdateItemRequestDto dto)
    {
        var item = await _db.Items.FirstOrDefaultAsync(i => i.Id == id);
        if (item == null) return null;

        if (!string.IsNullOrWhiteSpace(dto.Name))
            item.Name = dto.Name.Trim();

        if (dto.Rate.HasValue)
        {
            if (dto.Rate.Value < 0) throw new ArgumentException("Rate cannot be negative.");
            item.Rate = dto.Rate.Value;
        }

        if (dto.Quantity.HasValue)
        {
            if (dto.Quantity.Value < 0) throw new ArgumentException("Quantity cannot be negative.");
            item.Quantity = dto.Quantity.Value;
        }

        await _db.SaveChangesAsync();
        return ToDto(item);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var item = await _db.Items.FirstOrDefaultAsync(i => i.Id == id);
        if (item == null) return false;

        _db.Items.Remove(item);
        await _db.SaveChangesAsync();
        return true;
    }

    private static ItemResponseDto ToDto(Item item) =>
        new ItemResponseDto
        {
            Id = item.Id,
            Name = item.Name,
            Rate = item.Rate,
            Quantity = item.Quantity
        };
}
