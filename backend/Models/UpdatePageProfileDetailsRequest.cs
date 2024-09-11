namespace backend.Models;

public record UpdatePageProfileDetailsRequest(
    string? PhotoUrl,
    string? FirstName,
    string? LastName,
    string? Email,
    string? Phone
);