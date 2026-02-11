using Commerce.Api.Data;
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

    //USER + ADMIN can view all items
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _db.Items.ToListAsync();
        return Ok(items);
    }

    //USER + ADMIN can view a single item
    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _db.Items.FindAsync(id);
        if (item == null) return NotFound("Item not found.");
        return Ok(item);
    }

    //ADMIN only can create items
    [Authorize(Roles = "ADMIN")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Item item)
    {
        if (string.IsNullOrWhiteSpace(item.Name))
            return BadRequest("Name is required.");

        _db.Items.Add(item);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    //ADMIN only can update items
    [Authorize(Roles = "ADMIN")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Item updated)
    {
        var item = await _db.Items.FindAsync(id);
        if (item == null) return NotFound("Item not found.");

        item.Name = updated.Name;
        item.Rate = updated.Rate;
        item.Quantity = updated.Quantity;

        await _db.SaveChangesAsync();
        return Ok(item);
    }

    //ADMIN only can delete items
    [Authorize(Roles = "ADMIN")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.Items.FindAsync(id);
        if (item == null) return NotFound("Item not found.");

        _db.Items.Remove(item);
        await _db.SaveChangesAsync();

        return Ok("Item deleted.");
    }
}
