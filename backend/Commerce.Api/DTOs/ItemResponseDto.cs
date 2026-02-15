namespace Commerce.Api.DTOs;

public class ItemResponseDto //DTO for item responses, it contains the id, name, rate, and quantity of an item
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Rate { get; set; }
    public int Quantity { get; set; }
}
