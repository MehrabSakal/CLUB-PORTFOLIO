using Microsoft.EntityFrameworkCore;
using ClubPortfolio.Models;

namespace ClubPortfolio.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Registration> Registrations => Set<Registration>();
    public DbSet<SiteContent> SiteContents => Set<SiteContent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<SiteContent>().HasData(
            new SiteContent 
            { 
                Id = 1, 
                AboutUsText = "KUET Adventure Club is a community of explorers passionate about trekking, camping, cycling, and outdoor adventures. We aim to inspire students to step out of their comfort zones and experience nature.",
                ContactEmail = "kuetadventureclub@gmail.com",
                ContactLocation = "KUET Campus, Khulna"
            }
        );
    }
}
