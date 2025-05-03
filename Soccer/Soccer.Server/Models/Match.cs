namespace Soccer.Server.Models
{
    public class Match
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; } = string.Empty;
        public string Result { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public virtual Teams HomeTeam { get; set; } = null!;
        public virtual Teams AwayTeam { get; set; } = null!;
        public Competitions Competition { get; set; } = null!;
    }
}
