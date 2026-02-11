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

    // GET: /api/Items  (USER or ADMIN)
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<Item>>> GetAll()
    {
        var items = await _db.Items.AsNoTracking().ToListAsync();
        return Ok(items);
    }

    // GET: /api/Items/1  (USER or ADMIN)
    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Item>> GetById(int id)
    {
        var item = await _db.Items.AsNoTracking().FirstOrDefaultAsync(i => i.Id == id);
        if (item == null) return NotFound("Item not found");
        return Ok(item);
    }

    // POST: /api/Items  (ADMIN only)
    [Authorize(Roles = "ADMIN")]
    [HttpPost]
    public async Task<ActionResult<Item>> Create([FromBody] Item req)
    {
        _db.Items.Add(req);
        await _db.SaveChangesAsync();
        return Ok(req);
    }

    // PUT: /api/Items/1  (ADMIN only)
    [Authorize(Roles = "ADMIN")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Item req)
    {
        var item = await _db.Items.FirstOrDefaultAsync(i => i.Id == id);
        if (item == null) return NotFound("Item not found");

        item.Name = req.Name;
        item.Rate = req.Rate;
        item.Quantity = req.Quantity;

        await _db.SaveChangesAsync();
        return Ok(item);
    }

    // DELETE: /api/Items/1  (ADMIN only)
    [Authorize(Roles = "ADMIN")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.Items.FirstOrDefaultAsync(i => i.Id == id);
        if (item == null) return NotFound("Item not found");

        _db.Items.Remove(item);
        await _db.SaveChangesAsync();
        return Ok("Deleted");
    }
}
