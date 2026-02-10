using System.ComponentModel.DataAnnotations;

namespace Commerce.Api.Models;
public class Cart
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

}