using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderFlow.Business.Models;

namespace OrderFlow.Data.Mappings
{
    public class ProductMapping : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Title)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(d => d.Description)
                .IsRequired(false)
                .HasMaxLength(255);

            builder.Property(d => d.Price)
                .IsRequired()
                .HasColumnType("DECIMAL(16,2)");

            builder.Property(d => d.ImageURL)
                .IsRequired(false)
                .HasMaxLength(255);
        }
    }
}