using Commerce.Api.Data;
using Commerce.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Commerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")] // => /api/Items
public class ItemsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ItemsController(AppDbContext db)
    {
        _db = db;
    }

    // GET: /api/Items
    // If you want this protected, keep [Authorize]
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<Item>>> GetAll()
    {
        var items = await _db.Items.ToListAsync();
        return Ok(items);
    }

    // POST: /api/Items
    [Authorize(Roles = "ADMIN")]
    [HttpPost]
    public async Task<ActionResult<Item>> Create(Item item)
    {
        _db.Items.Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    // GET: /api/Items/5
    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Item>> GetById(int id)
    {
        var item = await _db.Items.FindAsync(id);
        if (item == null) return NotFound("Item not found");
        return Ok(item);
    }
}
