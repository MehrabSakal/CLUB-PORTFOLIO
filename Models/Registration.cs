namespace ClubPortfolio.Models;

public class Registration
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string StudentId { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Interest { get; set; } = string.Empty;
    public string? Message { get; set; }
}
