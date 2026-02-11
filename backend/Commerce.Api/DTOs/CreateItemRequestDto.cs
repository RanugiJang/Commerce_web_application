namespace Commerce.Api.DTOs;

public class CreateItemRequestDto
{
    public string Name { get; set; } = "";
    public decimal Rate { get; set; }
    public int Quantity { get; set; }
}
