namespace Commerce.Api.Models;

public class Role // Model class for roles, it contains the id and name of a role. The default role is "USER" with an id of 1.
{
    public int Id { get; set; }
    public string Name { get; set; } = "USER";
}
