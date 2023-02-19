using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderFlow.Data.Migrations
{
    public partial class RemovedProductsIcon : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Icon",
                table: "Products");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Icon",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
