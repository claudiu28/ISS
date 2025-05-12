using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public interface ICompetionRepository : IRepository<Competitions>
    {
        Task<Competitions?> GetCompetitionWithParticipants(long competitionId);
        Task<Competitions?> GetCompetitionWithMatches(long competitionId);
        Task<List<Teams>> GetCompetitionTeams(long competitionId);
        Task<List<User>> GetCompetitionParticipants(long competitionId);
        Task AddParticipantToCompetition(long competitionId, long userId, long teamId);
        Task RemoveParticipantFromCompetition(long competitionId, long participantId);
        Task AddMatchToCompetition(long competitionId, Match match);
        Task RemoveMatchFromCompetition(long competitionId, long matchId);
    }
}
