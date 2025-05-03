using Microsoft.EntityFrameworkCore;
using Soccer.Server.Models;
using System.Text.Json;

namespace Soccer.Server.Data
{
    public static class SeedData
    {
        public static void DBSeed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new
                {
                    Id = 1L,
                    Username = "admin",
                    PasswordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // "password"
                    FirstName = "Admin",
                    LastName = "User",
                    ProfileImage = "..\\Assert\\default-image.png",
                    CreateAt = DateTime.Parse("2023-01-01"),
                    UserRoles = new List<string> { "Admin", "User" }
                },
                new
                {
                    Id = 2L,
                    Username = "johndoe",
                    PasswordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
                    FirstName = "John",
                    LastName = "Doe",
                    ProfileImage = "..\\Assert\\default-image.png",
                    CreateAt = DateTime.Parse("2023-01-02"),
                    UserRoles = new List<string> { "User" }
                },
                new
                {
                    Id = 3L,
                    Username = "janedoe",
                    PasswordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
                    FirstName = "Jane",
                    LastName = "Doe",
                    ProfileImage = "..\\Assert\\default-image.png",
                    CreateAt = DateTime.Parse("2023-01-03"),
                    UserRoles = new List<string> { "Admin", "User" }
                }
            );

            modelBuilder.Entity<Teams>().HasData(
                new
                {
                    Id = 1L,
                    Name = "FC Barcelona",
                    Description = "Catalan football club",
                    Logo = "barcelona.png",
                    CreateAt = DateTime.Parse("2023-01-01"),
                    UpdateAt = DateTime.Parse("2023-01-01"),
                },
                new
                {
                    Id = 2L,
                    Name = "Real Madrid",
                    Description = "Spanish football club",
                    Logo = "realmadrid.png",
                    CreateAt = DateTime.Parse("2023-01-01"),
                    UpdateAt = DateTime.Parse("2023-01-01"),
                },
                new
                {
                    Id = 3L,
                    Name = "Liverpool FC",
                    Description = "English football club",
                    Logo = "liverpool.png",
                    CreateAt = DateTime.Parse("2023-01-01"),
                    UpdateAt = DateTime.Parse("2023-01-01"),
                }
            );

            modelBuilder.Entity<Teams>().Property("owner_id").HasDefaultValue(1L);

            modelBuilder.Entity<Competitions>().HasData(
                new
                {
                    Id = 1L,
                    CompetitionName = "Champions League 2023",
                    Description = "European club football tournament",
                    StartDate = DateTime.Parse("2023-09-01"),
                    EndDate = DateTime.Parse("2024-05-30"),
                    NumberOfTeams = 32L,
                    Status = "Active",
                },
                new
                {
                    Id = 2L,
                    CompetitionName = "Premier League 2023-24",
                    Description = "English top division",
                    StartDate = DateTime.Parse("2023-08-12"),
                    EndDate = DateTime.Parse("2024-05-19"),
                    NumberOfTeams = 20L,
                    Status = "Active",
                }
            );

            modelBuilder.Entity<Competitions>().Property("creator_id").HasDefaultValue(1L);

            modelBuilder.Entity<Posts>().HasData(
                new
                {
                    Id = 1,
                    Name = "Welcome to Soccer App",
                    Description = "This is the first post on our platform!",
                    CreatedAt = DateTime.Parse("2023-01-01"),
                    PostType = "News",
                },
                new
                {
                    Id = 2,
                    Name = "Champions League Draw",
                    Description = "The draw for the Champions League 2023 has been completed",
                    CreatedAt = DateTime.Parse("2023-08-31"),
                    PostType = "Event",
                }
            );

            modelBuilder.Entity<Posts>().Property("user_id").HasDefaultValue(1L);

            modelBuilder.Entity<Match>().HasData(
                new
                {
                    Id = 1L,
                    Date = DateTime.Parse("2023-09-19 20:00:00"),
                    Location = "Camp Nou, Barcelona",
                    Result = "2-1",
                    Description = "Group stage match",
                },
                new
                {
                    Id = 2L,
                    Date = DateTime.Parse("2023-09-20 20:00:00"),
                    Location = "Anfield, Liverpool",
                    Result = "3-0",
                    Description = "Group stage match",
                }
            );

            modelBuilder.Entity<Match>().Property("home_team_id").HasDefaultValue(1L);
            modelBuilder.Entity<Match>().Property("away_team_id").HasDefaultValue(2L);
            modelBuilder.Entity<Match>().Property("competition_id").HasDefaultValue(1L);

            modelBuilder.Entity<Participant>().HasData(
                new
                {
                    Id = 1L,
                    Status = "Accepted",
                },
                new
                {
                    Id = 2L,
                    Status = "Pending",
                }
            );

            modelBuilder.Entity<Participant>().Property("user_id").HasDefaultValue(2L);
            modelBuilder.Entity<Participant>().Property("competition_id").HasDefaultValue(1L);
            modelBuilder.Entity<Participant>().Property("members_id").HasDefaultValue(1L);

            modelBuilder.Entity<Recipe>().HasData(
              new
              {
                  Id = 1L,
                  Name = "Pre-match Energy Drink",
                  Description = "Perfect for hydration before a match",
                  CreatedAt = DateTime.Parse("2023-05-01"),
                  Ingredients = new List<string> { "Water: 500ml", "Sugar: 20g", "Salt: 1g", "Lemon juice: 30ml" },
                  Instructions = new List<string>{ "Mix all ingredients", "Stir well", "Refrigerate for 1 hour", "Serve cold" },
                  user_id = 3L
              }
            );

            modelBuilder.Entity("competitions_teams").HasData(
                new { competition_id = 1L, team_id = 1L },
                new { competition_id = 1L, team_id = 2L },
                new { competition_id = 1L, team_id = 3L },
                new { competition_id = 2L, team_id = 3L }
            );
        }
    }
}
