using System.ComponentModel.DataAnnotations;

namespace Soccer.Server.Models
{
    public class Teams
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Logo { get; set; } = string.Empty;
        public DateTime CreateAt { get; set; }
        public long UserId { get; set; }
        public User Owner { get; set; } = null!;
        public List<Participant> Participants { get; set; } = [];
        public List<Match> HomeMatches { get; set; } = [];
        public List<Match> AwayMatches { get; set; } = [];
        public bool IsOwner(long userId) => Owner.Id == userId;

    }

}
