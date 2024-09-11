using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DevpageContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Page> Pages { get; set; }
}