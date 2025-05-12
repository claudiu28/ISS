using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public interface IMatchRepository : IRepository<Match>
    {
        Task<Match?> GetMatchWithTeams(long matchId);
        Task<List<Match>> GetMatchesByCompetition(long competitionId);
        Task<List<Match>> GetMatchesByTeam(long teamId);
        Task CreateMatch(long homeTeamId, long awayTeamId, long competitionId, Match match);
        Task UpdateMatchResult(long matchId, string result);
    }
}
