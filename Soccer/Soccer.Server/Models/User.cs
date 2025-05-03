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
        public virtual ICollection<Teams> OwnedTeams { get; set; } = [];
        public virtual ICollection<Competitions> UserCompetitionsCreated { get; set; } = [];
        public virtual ICollection<Posts> UserPosts { get; set; } = [];
        public virtual ICollection<Participant> UserParticipations { get; set; } = [];
    }
}
