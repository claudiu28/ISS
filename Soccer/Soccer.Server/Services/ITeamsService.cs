using Soccer.Server.Models;

namespace Soccer.Server.Services
{
    public interface ITeamsService
    {
        public Task<Teams?> GetById(long id);
        public Task<IEnumerable<Teams>> GetAll();
        public Task<IEnumerable<Teams>> GetTeamsByOwner(long ownerId);
        public Task<IEnumerable<Teams>> GetTeamsByName(string name);
        public Task<Teams?> CreateTeam(Teams team);
        public Task<Teams?> UpdateTeam(Teams team);
        public Task<Teams?> DeleteTeam(long id);

        public Task<IEnumerable<Teams>> SearchTeams(string keyword);

        public Task<int> GetCompetitionCount(long teamId);

        public Task<IEnumerable<Teams>> GetTeamsWithMostCompetitions(int top = 5);

        public Task<bool> IsTeamOwnedByUser(long teamId, long userId);

        public Task<IEnumerable<Participant>> GetTeamMembers(long teamId);

        public Task<bool> AddParticipantsToTeam(long teamId, Participant particpant);

        public Task<bool> RemoveParticipantsFromTeam(long teamId, long participantId);

        public Task<IEnumerable<Match>> GetTeamHomeMatches(long teamId);
        public Task<bool> AddHomeMatchToTeam(long teamId, Match HomeMatch);
        public Task<bool> RemoveHomeMatchFromTeam(long teamId, long homeId);

        public Task<IEnumerable<Match>> GetAwayHomeMembers(long teamId);
        public Task<bool> AddAwayMatchToTeam(long teamId, Match awayMatch);

        public Task<bool> RemoveAwayMatchFromTeam(long teamId, long matchId);
        public Task<IEnumerable<Competitions>> GetTeamCompetitions(long teamId);
        public Task<bool> AddCompetitionsToTeam(long teamId, Competitions competitions);

        public Task<bool> RemoveCompetitionsFromTeam(long teamId, long competitionId);
    }
}
