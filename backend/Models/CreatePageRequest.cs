using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public record CreatePageRequest(
    [Required(AllowEmptyStrings = false)]
    string PageName,
    [Required(AllowEmptyStrings = false)]
    string UserId
);