using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Page
{
    [Key] public required string UniqueName { get; set; }
    public required string UserId { get; set; }
    public ProfileDetails? ProfileDetails { get; set; }
    public List<Link>? Links { get; set; }
}