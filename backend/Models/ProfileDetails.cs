namespace backend.Models;

public class ProfileDetails
{
    public int Id { get; set; }
    public string? PhotoUrl { get; set; }
    public string? FullName { get; set; }
    public string? Title { get; set; }
    public string? Bio { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
}