using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagesController(ILogger<PagesController> logger) : ControllerBase
{
    private readonly ILogger<PagesController> _logger = logger;

    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Hello World!");
    }
}
