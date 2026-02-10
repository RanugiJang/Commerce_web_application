using System.ComponentModel.DataAnnotations;

namespace Commerce.Api.Models;

public class CartItem
{
    [Key]
    public int Id { get; set; }

    public int CartId { get; set; }
    public Cart Cart { get; set; } = null!;

    public int ItemId { get; set; }
    public Item Item { get; set; } = null!;

    public int Quantity { get; set; }
}
