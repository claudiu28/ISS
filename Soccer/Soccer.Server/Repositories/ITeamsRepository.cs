using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public interface ITeamsRepository : IRepository<Teams>
    {
        Task<Teams?> GetTeamWithParticipants(long teamId);
        Task<Teams?> GetTeamWithMatches(long teamId);
        Task<List<User>> GetTeamMembers(long teamId);
        Task<bool> IsUserInTeam(long teamId, long userId);
        Task AddParticipantToTeam(long teamId, long userId, long competitionId);
        Task RemoveParticipantFromTeam(long teamId, long participantId);
        Task AddHomeMatch(long teamId, Match match);
        Task AddAwayMatch(long teamId, Match match);
        Task RemoveHomeMatch(long teamId, long matchId);
        Task RemoveAwayMatch(long teamId, long matchId);
    }
}
