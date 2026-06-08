using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ClubPortfolio.Data;
using ClubPortfolio.Models;

namespace ClubPortfolio.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SiteContentController : ControllerBase
{
    private readonly AppDbContext _context;

    public SiteContentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var content = await _context.SiteContents.FirstOrDefaultAsync(c => c.Id == 1);
        if (content == null)
        {
            return NotFound();
        }
        return Ok(content);
    }

    [Authorize]
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] SiteContent updatedContent)
    {
        var content = await _context.SiteContents.FirstOrDefaultAsync(c => c.Id == 1);
        if (content == null)
        {
            return NotFound();
        }

        content.AboutUsText = updatedContent.AboutUsText;
        content.ContactEmail = updatedContent.ContactEmail;
        content.ContactLocation = updatedContent.ContactLocation;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Content updated successfully" });
    }
}
