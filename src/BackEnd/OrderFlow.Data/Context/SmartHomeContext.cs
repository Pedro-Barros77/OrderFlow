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



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(OrderFlowContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}
