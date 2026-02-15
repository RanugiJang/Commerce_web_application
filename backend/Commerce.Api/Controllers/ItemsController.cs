using Commerce.Api.DTOs;
using Commerce.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Commerce.Api.Controllers;

[ApiController] 
[Route("api/[controller]")] 
public class ItemsController : ControllerBase
{
    private readonly IItemService _service;

    public ItemsController(IItemService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize] //get all items, requires authentication, returns 200 OK with the list of items
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

    [HttpGet("{id:int}")] //get item by id, requires authentication, returns 404 if not found
    [Authorize]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        return item == null ? NotFound("Item not found") : Ok(item);
    }

    [HttpPost]
    [Authorize(Roles = "ADMIN")] 
    public async Task<IActionResult> Create(CreateItemRequestDto dto)
        => Created("", await _service.CreateAsync(dto));

    [HttpPut("{id:int}")] //update item by id, requires admin role, returns 404 if not found
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Update(int id, UpdateItemRequestDto dto) 
    {
        var updated = await _service.UpdateAsync(id, dto); //returns the updated item if successful, otherwise 404 Not Found
        return updated == null ? NotFound("Item not found") : Ok(updated);
    }

    [HttpDelete("{id:int}")] 
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeleteAsync(id);
        return ok ? NoContent() : NotFound("Item not found"); //returns 204 No Content if deleted successfully, otherwise 404 Not Found
    }
}
