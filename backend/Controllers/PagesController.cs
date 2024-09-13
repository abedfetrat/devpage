using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagesController(DevpageContext context) : ControllerBase
{
    [HttpGet]
    public async Task<List<Page>> GetAllPages()
    {
        return await context.Pages.ToListAsync();
    }

    [HttpGet("{name}", Name = "GetPageByName")]
    public async Task<ActionResult<Page>> GetPageByName(string name)
    {
        var foundPage = await context.Pages.FirstOrDefaultAsync(x => x.UniqueName == name);

        if (foundPage is null)
        {
            return NotFound($"Page with name '{name}' was not found.");
        }

        return foundPage;
    }

    [HttpPost]
    public async Task<ActionResult<Page>> CreatePage(CreatePageRequest createPageRequest)
    {
        if (await PageExists(createPageRequest.PageName))
        {
            return Conflict($"Page with name '{createPageRequest.PageName}' already exists.");
        }

        // TODO: Validate Page Name

        var page = new Page()
        {
            UniqueName = createPageRequest.PageName,
            UserId = createPageRequest.UserId
        };

        context.Pages.Add(page);
        await context.SaveChangesAsync();

        return CreatedAtRoute("GetPageByName", new { name = page.UniqueName }, page);
    }

    [HttpPut("{name}/profile")]
    public async Task<ActionResult<Page>> UpdatePageProfileDetails(string name,
        UpdatePageProfileDetailsRequest updatePageProfileDetailsRequest)
    {
        var foundPage = await context.Pages.FirstOrDefaultAsync(x => x.UniqueName == name);

        if (foundPage is null)
        {
            return NotFound($"Page with name '{name}' was not found.");
        }

        foundPage.ProfileDetails = new ProfileDetails()
        {
            PhotoUrl = updatePageProfileDetailsRequest.PhotoUrl,
            FullName = updatePageProfileDetailsRequest.FullName,
            Title = updatePageProfileDetailsRequest.Title,
            Bio = updatePageProfileDetailsRequest.Bio,
            Email = updatePageProfileDetailsRequest.Email,
            Phone = updatePageProfileDetailsRequest.Phone
        };

        await context.SaveChangesAsync();

        return foundPage;
    }

    [HttpPut("{name}/links")]
    public async Task<ActionResult<Page>> UpdatePageLinks(string name,
        UpdatePageLinksRequest updatePageLinksRequest)
    {
        var foundPage = await context.Pages.FirstOrDefaultAsync(x => x.UniqueName == name);

        if (foundPage is null)
        {
            return NotFound($"Page with name '{name}' was not found.");
        }

        foundPage.Links = updatePageLinksRequest.Links;

        await context.SaveChangesAsync();

        return foundPage;
    }

    [HttpPut("{name}/settings")]
    public async Task<ActionResult<Page>> UpdatePageSettings(string name,
        Settings settings)
    {
        var foundPage = await context.Pages.FirstOrDefaultAsync(x => x.UniqueName == name);

        if (foundPage is null)
        {
            return NotFound($"Page with name '{name}' was not found.");
        }

        foundPage.Settings = settings;

        await context.SaveChangesAsync();

        return foundPage;
    }

    [HttpPut("{name}/resumeUrl")]
    public async Task<ActionResult<Page>> UpdatePageResumeUrl(string name,
        string? resumeUrl)
    {
        var foundPage = await context.Pages.FirstOrDefaultAsync(x => x.UniqueName == name);

        if (foundPage is null)
        {
            return NotFound($"Page with name '{name}' was not found.");
        }

        foundPage.ResumeUrl = resumeUrl;

        await context.SaveChangesAsync();

        return foundPage;
    }

    [HttpDelete("{name}/resumeUrl")]
    public async Task<IActionResult> RemovePageResumeUrl(string name)
    {
        var foundPage = await context.Pages.FirstOrDefaultAsync(x => x.UniqueName == name);

        if (foundPage is null)
        {
            return NotFound($"Page with name '{name}' was not found.");
        }

        foundPage.ResumeUrl = null;

        await context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<bool> PageExists(string name)
    {
        return await context.Pages.FirstOrDefaultAsync(x => x.UniqueName == name) is not null;
    }
}