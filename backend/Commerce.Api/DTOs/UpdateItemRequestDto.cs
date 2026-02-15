namespace Commerce.Api.DTOs;

public class UpdateItemRequestDto //DTO for updating an existing item, it contains the name, rate, and quantity of the item to be updated. All properties are nullable to allow partial updates.
{
    public string? Name { get; set; }
    public decimal? Rate { get; set; }
    public int? Quantity { get; set; }
}
