namespace Commerce.Api.Models;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Rate { get; set; }
    public int Quantity { get; set; }
}
