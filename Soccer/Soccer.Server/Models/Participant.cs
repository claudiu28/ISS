namespace Soccer.Server.Models
{
    public class Participant
    {
        public long Id { get; set; }

        public User User { get; set; } = null!;
        public Competitions Competition { get; set; } = null!;

        public Teams Team { get; set; } = null!;

        public string Status { get; set; } = "Pending";
    }
}
