using Commerce.Api.Data;
using Commerce.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Commerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // 🔐 User must be logged in
public class CartController : ControllerBase
{
    private readonly AppDbContext _db;

    public CartController(AppDbContext db)
    {
        _db = db;
    }

    // GET: api/cart
    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return Unauthorized();

        var cart = await _db.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Item)
            .FirstOrDefaultAsync(c => c.UserId == user.Id);

        if (cart == null)
            return Ok(new { items = new List<object>() });

        return Ok(cart);
    }

    // POST: api/cart/add
    [HttpPost("add")]
    public async Task<IActionResult> AddToCart(int itemId, int quantity = 1)
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return Unauthorized();

        var cart = await _db.Carts
            .Include(c => c.CartItems)
            .FirstOrDefaultAsync(c => c.UserId == user.Id);

        if (cart == null)
        {
            cart = new Cart { UserId = user.Id };
            _db.Carts.Add(cart);
            await _db.SaveChangesAsync();
        }

        var existingItem = cart.CartItems.FirstOrDefault(i => i.ItemId == itemId);

        if (existingItem != null)
        {
            existingItem.Quantity += quantity;
        }
        else
        {
            cart.CartItems.Add(new CartItem
            {
                ItemId = itemId,
                Quantity = quantity
            });
        }

        await _db.SaveChangesAsync();
        return Ok("Item added to cart");
    }

    // DELETE: api/cart/remove/{itemId}
    [HttpDelete("remove/{itemId}")]
    public async Task<IActionResult> RemoveItem(int itemId)
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return Unauthorized();

        var cartItem = await _db.CartItems
            .FirstOrDefaultAsync(ci =>
                ci.ItemId == itemId &&
                ci.Cart.UserId == user.Id);

        if (cartItem == null)
            return NotFound("Item not in cart");

        _db.CartItems.Remove(cartItem);
        await _db.SaveChangesAsync();

        return Ok("Item removed");
    }
}
