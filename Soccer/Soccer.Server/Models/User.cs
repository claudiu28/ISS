using System.Text.Json.Serialization;

namespace Soccer.Server.Models
{
    public class User
    {
        public long Id { get; set; }
        public string ProfileImage { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public ICollection<string> UserRoles { get; set; } = [];
        public DateTime CreateAt { get; set; }
        
        [JsonIgnore]
        public List<Recipe> UserRecipes { get; set; } = [];
        [JsonIgnore]
        public List<Teams> OwnedTeams { get; set; } = [];
        [JsonIgnore]
        public List<Competitions> UserCompetitionsCreated { get; set; } = [];
        [JsonIgnore]
        public List<Participant> UserParticipations { get; set; } = [];
    }
}
