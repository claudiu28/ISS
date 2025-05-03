using System.Text.RegularExpressions;

namespace Soccer.Server.Models
{
    public class Teams
    {
        public long Id { get; set; }
        public string Logo { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public User Owner { get; set; } = null!;

        public virtual ICollection<Participant> MembersInTeam { get; set; } = [];
        public virtual ICollection<Competitions> TeamCompetitions { get; set; } = [];
        public virtual ICollection<Match> HomeMatches { get; set; } =[];
        public virtual ICollection<Match> AwayMatches { get; set; } = [];

    }
}
