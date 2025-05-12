namespace Soccer.Server.Models
{
    public class Match
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; } = string.Empty;
        public string Result { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public long HomeTeamId { get; set; }
        public long AwayTeamId { get; set; }
        public long CompetitionId { get; set; }
        public Teams HomeTeam { get; set; } = null!;
        public Teams AwayTeam { get; set; } = null!;
        public Competitions Competition { get; set; } = null!;
    }
}
