using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Soccer.Server.Migrations
{
    /// <inheritdoc />
    public partial class RecreateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_matches_teams_away_team_id",
                table: "matches");

            migrationBuilder.DropForeignKey(
                name: "FK_matches_teams_home_team_id",
                table: "matches");

            migrationBuilder.DropForeignKey(
                name: "FK_teams_users_owner_id",
                table: "teams");

            migrationBuilder.DropTable(
                name: "competitions_teams");

            migrationBuilder.DropTable(
                name: "posts");

            migrationBuilder.DropColumn(
                name: "update_at",
                table: "teams");

            migrationBuilder.AddForeignKey(
                name: "FK_matches_teams_away_team_id",
                table: "matches",
                column: "away_team_id",
                principalTable: "teams",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_matches_teams_home_team_id",
                table: "matches",
                column: "home_team_id",
                principalTable: "teams",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_teams_users_owner_id",
                table: "teams",
                column: "owner_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_matches_teams_away_team_id",
                table: "matches");

            migrationBuilder.DropForeignKey(
                name: "FK_matches_teams_home_team_id",
                table: "matches");

            migrationBuilder.DropForeignKey(
                name: "FK_teams_users_owner_id",
                table: "teams");

            migrationBuilder.AddColumn<DateTime>(
                name: "update_at",
                table: "teams",
                type: "timestamp without time zone",
                nullable: false,
                defaultValueSql: "LOCALTIMESTAMP");

            migrationBuilder.CreateTable(
                name: "competitions_teams",
                columns: table => new
                {
                    competition_id = table.Column<long>(type: "bigint", nullable: false),
                    team_id = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_competitions_teams", x => new { x.competition_id, x.team_id });
                    table.ForeignKey(
                        name: "FK_competitions_teams_competitions_competition_id",
                        column: x => x.competition_id,
                        principalTable: "competitions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_competitions_teams_teams_team_id",
                        column: x => x.team_id,
                        principalTable: "teams",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "posts",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<long>(type: "bigint", nullable: false),
                    create_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "LOCALTIMESTAMP"),
                    post_description = table.Column<string>(type: "text", nullable: false),
                    post_title = table.Column<string>(type: "text", nullable: false),
                    post_type = table.Column<string>(type: "text", nullable: false, defaultValue: "News")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_posts", x => x.id);
                    table.ForeignKey(
                        name: "FK_posts_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_competitions_teams_team_id",
                table: "competitions_teams",
                column: "team_id");

            migrationBuilder.CreateIndex(
                name: "IX_posts_user_id",
                table: "posts",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_matches_teams_away_team_id",
                table: "matches",
                column: "away_team_id",
                principalTable: "teams",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_matches_teams_home_team_id",
                table: "matches",
                column: "home_team_id",
                principalTable: "teams",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_teams_users_owner_id",
                table: "teams",
                column: "owner_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
