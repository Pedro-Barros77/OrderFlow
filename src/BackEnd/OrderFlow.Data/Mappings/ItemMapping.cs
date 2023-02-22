using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderFlow.Business.Enums;
using OrderFlow.Business.Models;

namespace OrderFlow.Data.Mappings
{
    public class ItemMapping : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Count)
                .IsRequired()
                .HasDefaultValue(1);

            builder.Property(d => d.Discount)
                .HasColumnType("DECIMAL(16,2)");

            builder.Property(d => d.Additional)
                .HasColumnType("DECIMAL(16,2)");           

            builder.HasOne(d => d.Table)
                .WithMany(t => t.Items)
                .HasForeignKey(d => d.TableId);

            builder.HasOne(d => d.Product)
                .WithMany(p => p.Items)
                .HasForeignKey(d => d.ProductId);

            builder.Property(d => d.Note)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(d => d.Status)
                .HasDefaultValue(ItemStatus.Pendente).IsRequired();

        }
    }
}