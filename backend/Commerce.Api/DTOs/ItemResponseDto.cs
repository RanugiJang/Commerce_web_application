namespace Commerce.Api.DTOs;

public class ItemResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Rate { get; set; }
    public int Quantity { get; set; }
}
