using Microsoft.EntityFrameworkCore;
using Soccer.Server.Models;
using System.Text.Json;


namespace Soccer.Server.Data
{
    public class AppContextDb(DbContextOptions<AppContextDb> options) : DbContext(options)
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Competitions> Competitions { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Teams> Teams { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
                entity.Property(e => e.Username).IsRequired().HasColumnName("username");
                entity.HasIndex(e => e.Username).IsUnique();
                entity.Property(e => e.PasswordHash).IsRequired().HasColumnName("password_hash");
                entity.Property(e => e.ProfileImage).IsRequired(false).HasColumnName("profile_image").HasDefaultValue("..\\wwwroot\\Assert\\default-image.png");
                entity.Property(e => e.LastName).IsRequired(false).HasColumnName("last_name");
                entity.Property(e => e.FirstName).IsRequired(false).HasColumnName("first_name");
                entity.Property(e => e.CreateAt).HasDefaultValueSql("LOCALTIMESTAMP").HasColumnName("create_at").HasColumnType("timestamp without time zone");
                entity.Property(e => e.UserRoles).HasColumnType("jsonb").HasColumnName("user_roles");
                entity.Property(r => r.UserRoles)
               .HasConversion(
                   roles => JsonSerializer.Serialize(roles, null as JsonSerializerOptions),
                   json => JsonSerializer.Deserialize<List<string>>(json, null as JsonSerializerOptions) ?? new List<string>());

                entity.ToTable("users");
            });

            modelBuilder.Entity<Participant>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();

                entity.HasOne(e => e.User).WithMany(u => u.UserParticipations).HasForeignKey(p => p.UserId).OnDelete(DeleteBehavior.Cascade);
                entity.Property(p => p.UserId).HasColumnName("user_id");

                entity.HasOne(e => e.Team).WithMany(t => t.Participants).HasForeignKey(m => m.TeamId).OnDelete(DeleteBehavior.Cascade);
                entity.Property(m => m.TeamId).HasColumnName("members_id");

                entity.HasOne(e => e.Competition).WithMany(t => t.CompetitionParticipants).HasForeignKey(m => m.CompetitionId).OnDelete(DeleteBehavior.Cascade);
                entity.Property(m => m.CompetitionId).HasColumnName("competition_id");

                entity.Property(e => e.Status).IsRequired().HasDefaultValue("Pending").HasColumnName("status");

                entity.ToTable("participants");

            });

            modelBuilder.Entity<Competitions>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();

                entity.Property(e => e.CompetitionName).IsRequired().HasColumnName("competition_name");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.StartDate).HasColumnName("start_date").HasColumnType("timestamp without time zone"); ;
                entity.Property(e => e.EndDate).HasColumnName("end_date").HasColumnType("timestamp without time zone"); ;
                entity.Property(e => e.NumberOfTeams).HasColumnName("number_of_teams");
                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(e => e.Creator).WithMany(u => u.UserCompetitionsCreated).HasForeignKey(c => c.CreatorId).OnDelete(DeleteBehavior.Cascade);
                entity.Property(c => c.CreatorId).HasColumnName("creator_id");

                entity.ToTable("competitions");
            }
            );

            modelBuilder.Entity<Teams>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();

                entity.Property(e => e.Name).IsRequired().HasColumnName("name");
                entity.Property(e => e.Description).IsRequired().HasColumnName("description");
                entity.Property(e => e.CreateAt).IsRequired().HasColumnName("create_at").HasDefaultValueSql("LOCALTIMESTAMP").HasColumnType("timestamp without time zone");
                entity.Property(e => e.Logo).HasColumnName("logo");

                entity.HasOne(e => e.Owner).WithMany(u => u.OwnedTeams).HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Cascade);
                entity.Property(t => t.UserId).HasColumnName("owner_id");

                entity.ToTable("teams");

            });

            modelBuilder.Entity<Match>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();

                entity.Property(e => e.Date).IsRequired().HasColumnName("date").HasColumnType("timestamp without time zone");
                entity.Property(e => e.Location).IsRequired().HasColumnName("location");
                entity.Property(e => e.Result).HasColumnName("result");
                entity.Property(e => e.Description).HasColumnName("description");

                entity.HasOne(e => e.HomeTeam).WithMany(t => t.HomeMatches).HasForeignKey(t => t.HomeTeamId).OnDelete(DeleteBehavior.Cascade);
                entity.Property(t => t.HomeTeamId).HasColumnName("home_team_id");

                entity.HasOne(e => e.AwayTeam).WithMany(t => t.AwayMatches).HasForeignKey(t => t.AwayTeamId).OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.AwayTeamId).HasColumnName("away_team_id");

                entity.HasOne(e => e.Competition).WithMany(c => c.CompetitionsMetches).HasForeignKey(f => f.CompetitionId).OnDelete(DeleteBehavior.Cascade);
                entity.Property(f => f.CompetitionId).HasColumnName("competition_id");

                entity.ToTable("matches");
            });

            modelBuilder.Entity<Recipe>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();

                entity.Property(e => e.Name).IsRequired().HasColumnName("name");
                entity.Property(e => e.Description).IsRequired().HasColumnName("description");
                entity.Property(e => e.CreatedAt).IsRequired().HasColumnName("created_at").HasColumnType("timestamptz");

                entity.Property(e => e.Instructions).IsRequired().HasColumnName("instructions").HasColumnType("jsonb");
                entity.Property(e => e.Ingredients).IsRequired().HasColumnName("ingredients").HasColumnType("jsonb");

                entity.Property(e => e.UserId).HasColumnName("user_id"); 

                entity.HasOne(r => r.User)
                      .WithMany(r => r.UserRecipes)
                      .HasForeignKey(r => r.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.Property(r => r.Instructions)
                .HasConversion(
                    instructions => JsonSerializer.Serialize(instructions, null as JsonSerializerOptions),
                    json => JsonSerializer.Deserialize<List<string>>(json, null as JsonSerializerOptions) ?? new List<string>());

                entity.Property(r => r.Ingredients)
                    .HasConversion(
                        ingredients => JsonSerializer.Serialize(ingredients, null as JsonSerializerOptions),
                        json => JsonSerializer.Deserialize<List<string>>(json, null as JsonSerializerOptions) ?? new List<string>()
                    );


                entity.ToTable("recipes");
            });

        }


    }
}
