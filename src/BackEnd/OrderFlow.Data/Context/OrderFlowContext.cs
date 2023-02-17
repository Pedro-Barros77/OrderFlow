using Microsoft.EntityFrameworkCore;
using OrderFlow.Business.Models;

namespace OrderFlow.Data.Context
{
    public class OrderFlowContext : DbContext
    {
        public OrderFlowContext(DbContextOptions<OrderFlowContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Category> Categories { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(OrderFlowContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}
