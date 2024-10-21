using Microsoft.EntityFrameworkCore;
using Shopping.Models;

namespace Shopping.Data
{
    public class ShoppingDbContext : DbContext
    {
        public ShoppingDbContext(DbContextOptions<ShoppingDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18, 2)");

            base.OnModelCreating(modelBuilder);
        }
    }
}
