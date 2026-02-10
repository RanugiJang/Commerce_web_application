using Commerce.Api.Data;
using Commerce.Api.DTOs;
using Commerce.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ItemsController(AppDbContext db)
    {
        _db = db;
    }

    //USER + ADMIN (must be logged in)
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<Item>>> GetAll()
    {
        var items = await _db.Items.OrderBy(i => i.Id).ToListAsync();
        return Ok(items);
    }

    //USER + ADMIN (must be logged in)
    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Item>> GetById(int id)
    {
        var item = await _db.Items.FindAsync(id);
        if (item is null) return NotFound("Item not found.");
        return Ok(item);
    }

    //ADMIN only
    [Authorize(Roles = "ADMIN")]
    [HttpPost]
    public async Task<ActionResult<Item>> Create([FromBody] CreateItemDto dto)
    {
        var item = new Item
        {
            Name = dto.Name.Trim(),
            Rate = dto.Price,
            Quantity = dto.Stock
        };

        _db.Items.Add(item);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    // ✅ ADMIN only
    [Authorize(Roles = "ADMIN")]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<Item>> Update(int id, [FromBody] UpdateItemDto dto)
    {
        var item = await _db.Items.FindAsync(id);
        if (item is null) return NotFound("Item not found.");

        item.Name = dto.Name.Trim();
        item.Rate = dto.Price;
        item.Quantity = dto.Stock;

        await _db.SaveChangesAsync();
        return Ok(item);
    }

    //ADMIN only
    [Authorize(Roles = "ADMIN")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.Items.FindAsync(id);
        if (item is null) return NotFound("Item not found.");

        _db.Items.Remove(item);
        await _db.SaveChangesAsync();

        return Ok("Deleted.");
    }
}
