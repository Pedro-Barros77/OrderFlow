using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderFlow.Business.Models;

namespace OrderFlow.Data.Mappings
{
    public class CategoryMapping : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Title)
                .IsRequired()
                .HasMaxLength(50);

        }
    }
}