namespace Soccer.Server.Models
{
    public class Participant
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public User User { get; set; } = null!;
        public long CompetitionId { get; set; }
        public Competitions Competition { get; set; } = null!;
        public long TeamId { get; set; }
        public Teams Team { get; set; } = null!;
        public string Status { get; set; } = "Pending";
    }
}
