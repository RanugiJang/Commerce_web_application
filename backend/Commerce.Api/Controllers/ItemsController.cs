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

    // PUBLIC (no token)
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var items = await _db.Items.ToListAsync();
        return Ok(items);
    }

    //USER or ADMIN (token required)
    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _db.Items.FindAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    //ADMIN only
    [HttpPost]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Create(Item item)
    {
        _db.Items.Add(item);
        await _db.SaveChangesAsync();
        return Ok(item);
    }

    //ADMIN only
    [HttpPut("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Update(int id, Item item)
    {
        var existing = await _db.Items.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = item.Name;
        existing.Rate = item.Rate;
        existing.Quantity = item.Quantity;

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    //ADMIN only
    [HttpDelete("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.Items.FindAsync(id);
        if (item == null) return NotFound();

        _db.Items.Remove(item);
        await _db.SaveChangesAsync();
        return Ok("Item deleted");
    }
}
