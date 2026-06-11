using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace ClubPortfolio.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GalleryController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;

    public GalleryController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpGet]
    public IActionResult GetImages()
    {
        var uploadFolder = Path.Combine(_environment.WebRootPath, "uploads", "gallery");
        
        if (!Directory.Exists(uploadFolder))
        {
            return Ok(new string[] {});
        }

        var files = Directory.GetFiles(uploadFolder)
                             .Select(Path.GetFileName)
                             .Select(f => $"/uploads/gallery/{f}")
                             .ToList();
                             
        return Ok(files);
    }

    [Authorize]
    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage(IFormFile image)
    {
        if (image == null || image.Length == 0)
        {
            return BadRequest(new { message = "No image provided." });
        }

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
        var extension = Path.GetExtension(image.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(extension))
        {
            return BadRequest(new { message = "Invalid file type." });
        }

        var uploadFolder = Path.Combine(_environment.WebRootPath, "uploads", "gallery");
        
        if (!Directory.Exists(uploadFolder))
        {
            Directory.CreateDirectory(uploadFolder);
        }

        var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(image.FileName);
        var filePath = Path.Combine(uploadFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        return Ok(new { message = "Image uploaded successfully", url = $"/uploads/gallery/{uniqueFileName}" });
    }
}
