using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderFlow.Business.Models;

namespace OrderFlow.Data.Mappings
{
    public class TableMapping : IEntityTypeConfiguration<Table>
    {
        public void Configure(EntityTypeBuilder<Table> builder)
        {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Name)
                .IsRequired(false)
                .HasMaxLength(50);

            builder.Property(d => d.PaidValue)              
                .HasColumnType("DECIMAL(16,2)");


        }
    }
}