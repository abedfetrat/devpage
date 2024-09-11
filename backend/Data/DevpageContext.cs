using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DevpageContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Page> Pages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Page>().Navigation(p => p.ProfileDetails).AutoInclude();
        modelBuilder.Entity<Page>().Navigation(p => p.Links).AutoInclude();
    }
}