namespace backend.Models;

public record UpdatePageProfileDetailsRequest(
    string? PhotoUrl,
    string? FullName,
    string? Title,
    string? Bio,
    string? Email,
    string? Phone
);