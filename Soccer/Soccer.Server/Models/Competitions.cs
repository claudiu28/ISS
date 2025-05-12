using Microsoft.Identity.Client;

namespace Soccer.Server.Models
{
    public class Competitions
    {
        public long Id { get; set; }
        public long CreatorId { get; set; }
        public User Creator { get; set; } = null!;
        public string CompetitionName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public long NumberOfTeams { get; set; } 
        public string Status { get; set; } = string.Empty;
        public virtual List<Participant> CompetitionParticipants { get; set; } = [];
        public virtual List<Match> CompetitionsMetches { get; set; } = [];
    }
}
