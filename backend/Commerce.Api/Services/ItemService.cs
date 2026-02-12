using Commerce.Api.DTOs;
using Commerce.Api.Models;
using Commerce.Api.Repositories;

namespace Commerce.Api.Services;

public class ItemService : IItemService
{
    private readonly IItemRepository _repo;

    public ItemService(IItemRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<ItemResponseDto>> GetAllAsync()
        => (await _repo.GetAllAsync()).Select(ToDto).ToList();

    public async Task<ItemResponseDto?> GetByIdAsync(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        return item == null ? null : ToDto(item);
    }

    public async Task<ItemResponseDto> CreateAsync(CreateItemRequestDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name)) throw new ArgumentException("Name required.");
        if (dto.Rate <= 0) throw new ArgumentException("Rate must be > 0.");

        var item = new Item
        {
            Name = dto.Name.Trim(),
            Rate = dto.Rate,
            Quantity = dto.Quantity
        };

        var created = await _repo.CreateAsync(item);
        return ToDto(created);
    }

    public async Task<ItemResponseDto?> UpdateAsync(int id, UpdateItemRequestDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return null;

        if (!string.IsNullOrWhiteSpace(dto.Name))
            item.Name = dto.Name.Trim();

        if (dto.Rate.HasValue)
        {
            if (dto.Rate.Value <= 0) throw new ArgumentException("Rate must be > 0.");
            item.Rate = dto.Rate.Value;
        }

        if (dto.Quantity.HasValue)
            item.Quantity = dto.Quantity.Value;

        var updated = await _repo.UpdateAsync(item);
        return updated == null ? null : ToDto(updated);
    }

    public Task<bool> DeleteAsync(int id) => _repo.DeleteAsync(id);

    private static ItemResponseDto ToDto(Item i) => new ItemResponseDto
    {
        Id = i.Id,
        Name = i.Name,
        Rate = i.Rate,
        Quantity = i.Quantity
    };
}
