namespace Commerce.Api.Models;

public class Item   //Model class for items, it contains the id, name, rate, and quantity of an item
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Rate { get; set; }
    public int Quantity { get; set; }
}
