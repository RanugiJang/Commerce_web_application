using System.ComponentModel.DataAnnotations;

namespace Commerce.Api.DTOs;

public class CreateItemDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = "";

    [Required]
    [Range(0.01, 999999)]
    public decimal Rate { get; set; }

    [Range(0, 999999)]
    public int Quantity { get; set; }
}
