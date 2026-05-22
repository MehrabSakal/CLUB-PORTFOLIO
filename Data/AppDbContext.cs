using Microsoft.EntityFrameworkCore;
using ClubPortfolio.Models;

namespace ClubPortfolio.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Registration> Registrations => Set<Registration>();
}
