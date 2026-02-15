namespace Commerce.Api.DTOs;

public class CreateItemRequestDto //DTO for creating a new item, it contains the name, rate, and quantity of the item to be created
{
    public string Name { get; set; } = "";
    public decimal Rate { get; set; }
    public int Quantity { get; set; }
}
