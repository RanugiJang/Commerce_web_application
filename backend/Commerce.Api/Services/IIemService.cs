using Commerce.Api.DTOs;

namespace Commerce.Api.Services;

public interface IItemService
{
    Task<List<ItemResponseDto>> GetAllAsync();
    Task<ItemResponseDto?> GetByIdAsync(int id);
    Task<ItemResponseDto> CreateAsync(CreateItemRequestDto dto);
    Task<ItemResponseDto?> UpdateAsync(int id, UpdateItemRequestDto dto);
    Task<bool> DeleteAsync(int id);
}
