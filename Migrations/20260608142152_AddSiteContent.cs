using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CLUB_PORTFOLIO.Migrations
{
    /// <inheritdoc />
    public partial class AddSiteContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SiteContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AboutUsText = table.Column<string>(type: "TEXT", nullable: false),
                    ContactEmail = table.Column<string>(type: "TEXT", nullable: false),
                    ContactLocation = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteContents", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "SiteContents",
                columns: new[] { "Id", "AboutUsText", "ContactEmail", "ContactLocation" },
                values: new object[] { 1, "KUET Adventure Club is a community of explorers passionate about trekking, camping, cycling, and outdoor adventures. We aim to inspire students to step out of their comfort zones and experience nature.", "kuetadventureclub@gmail.com", "KUET Campus, Khulna" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SiteContents");
        }
    }
}
