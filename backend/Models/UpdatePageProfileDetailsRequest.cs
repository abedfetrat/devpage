namespace backend.Models;

public record UpdatePageProfileDetailsRequest(
    string? PhotoUrl,
    string? FullName,
    string? Bio,
    string? Email,
    string? Phone
);