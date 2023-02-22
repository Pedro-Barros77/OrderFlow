using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderFlow.Data.Migrations
{
    public partial class UpdatedItemColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Delivered",
                table: "Items",
                newName: "Paid");

            migrationBuilder.AddColumn<decimal>(
                name: "Additional",
                table: "Items",
                type: "DECIMAL(16,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Items",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 1);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Additional",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "Paid",
                table: "Items",
                newName: "Delivered");
        }
    }
}
