using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagesController(ILogger<PagesController> logger) : ControllerBase
{
    private readonly ILogger<PagesController> _logger = logger;
    private static readonly List<Page> Pages = [];

    [HttpGet]
    public List<Page> GetAllPages()
    {
        return Pages;
    }

    [HttpGet("{name}", Name = "GetPageByName")]
    public ActionResult<Page> GetPageByName(string name)
    {
        var foundPage = Pages.FirstOrDefault(x => x.UniqueName == name);

        if (foundPage is null)
        {
            return NotFound($"Page with name '{name}' was not found.");
        }

        return foundPage;
    }

    [HttpPost]
    public ActionResult<Page> CreatePage(CreatePageRequest createPageRequest)
    {
        if (Pages.Exists(x =>
                string.Equals(x.UniqueName, createPageRequest.PageName, StringComparison.OrdinalIgnoreCase)))
        {
            return Conflict($"Page with name '{createPageRequest.PageName}' already exists.");
        }

        // TODO: Validate Page Name

        var page = new Page()
        {
            UniqueName = createPageRequest.PageName,
            UserId = createPageRequest.UserId
        };

        Pages.Add(page);

        return CreatedAtRoute("GetPageByName", new { name = page.UniqueName }, page);
    }

    [HttpPut("{name}/profile")]
    public ActionResult<Page> UpdatePageProfileDetails(string name,
        UpdatePageProfileDetailsRequest updatePageProfileDetailsRequest)
    {
        var foundPage = Pages.FirstOrDefault(x => x.UniqueName == name);

        if (foundPage is null)
        {
            return NotFound($"Page with name '{name}' was not found.");
        }

        foundPage.ProfileDetails = new ProfileDetails()
        {
            PhotoUrl = updatePageProfileDetailsRequest.PhotoUrl,
            FirstName = updatePageProfileDetailsRequest.FirstName,
            LastName = updatePageProfileDetailsRequest.LastName,
            Email = updatePageProfileDetailsRequest.Email,
            Phone = updatePageProfileDetailsRequest.Phone
        };

        return foundPage;
    }
    
    [HttpPut("{name}/links")]
    public ActionResult<Page> UpdatePageLinks(string name,
        UpdatePageLinksRequest updatePageLinksRequest)
    {
        var foundPage = Pages.FirstOrDefault(x => x.UniqueName == name);

        if (foundPage is null)
        {
            return NotFound($"Page with name '{name}' was not found.");
        }

        foundPage.Links = updatePageLinksRequest.Links;

        return foundPage;
    }
}