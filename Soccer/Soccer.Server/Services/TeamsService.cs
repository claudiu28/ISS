using Microsoft.EntityFrameworkCore;
using Soccer.Server.Models;
using Soccer.Server.Repositories;

namespace Soccer.Server.Services
{

    public class TeamsService(ITeamsRepository teamsRepository, IUserRepository userRepository) : ITeamsService
    {
        private readonly ITeamsRepository _teamsRepository = teamsRepository;
        private readonly IUserRepository _userRepository = userRepository;

        public async Task<Teams?> GetById(long id)
        {
            var team = await _teamsRepository.GetById(id);
            if (team == null)
                throw new Exception($"Team not found with id: {id}");
            return team;
        }

        public async Task<IEnumerable<Teams>> GetAll()
        {
            return await _teamsRepository.GetAll();
        }

        public async Task<IEnumerable<Teams>> GetTeamsByOwner(long ownerId)
        {
            var owner = await _userRepository.GetById(ownerId);
            if (owner == null)
                throw new Exception($"Owner not found with id: {ownerId}");

            return await _teamsRepository.Query()
                .Where(t => t.UserId == ownerId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Teams>> GetTeamsByName(string name)
        {
            return await _teamsRepository.Query()
                .Where(t => t.Name.Contains(name))
                .ToListAsync();
        }

        public async Task<Teams?> CreateTeam(Teams team)
        {
            if (team == null)
                throw new Exception("Team cannot be null");

            await _teamsRepository.Create(team);
            return team;
        }

        public async Task<Teams?> UpdateTeam(Teams team)
        {
            if (team == null)
                throw new Exception("Team cannot be null");

            await _teamsRepository.Update(team);
            return team;
        }

        public async Task<Teams?> DeleteTeam(long id)
        {
            var team = await _teamsRepository.GetById(id);
            if (team == null)
                throw new Exception($"Team not found with id: {id}");

            await _teamsRepository.Delete(id);
            return team;
        }

        public async Task<IEnumerable<Teams>> SearchTeams(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
                return [];

            return await _teamsRepository.Query()
                .Where(t => t.Name.Contains(keyword))
                .ToListAsync();
        }

        public async Task<int> GetCompetitionCount(long teamId)
        {
            return await _teamsRepository.Query()
                .Where(t => t.Id == teamId)
                .SelectMany(t => t.Participants)
                .CountAsync();
        }

        public async Task<IEnumerable<Teams>> GetTeamsWithMostCompetitions(int top = 5)
        {
            return await _teamsRepository.Query()
                .Include(t => t.Participants)
                .OrderByDescending(t => t.Participants.Count)
                .Take(top)
                .ToListAsync();
        }

        public async Task<bool> IsTeamOwnedByUser(long teamId, long userId)
        {
            var team = await _teamsRepository.GetById(teamId);
            return team?.UserId == userId;
        }

        public async Task<IEnumerable<Participant>> GetTeamMembers(long teamId)
        {
            var team = await _teamsRepository.GetTeamWithParticipants(teamId);
            return team?.Participants ?? [];
        }

        public async Task<bool> AddParticipantsToTeam(long teamId, Participant participant)
        {
            if (participant == null)
                throw new Exception("Participant cannot be null");

            try
            {
                await _teamsRepository.AddParticipantToTeam(teamId, participant.UserId, participant.CompetitionId);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> RemoveParticipantsFromTeam(long teamId, long participantId)
        {
            try
            {
                await _teamsRepository.RemoveParticipantFromTeam(teamId, participantId);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<IEnumerable<Match>> GetTeamHomeMatches(long teamId)
        {
            var team = await _teamsRepository.GetTeamWithMatches(teamId);
            return team?.HomeMatches ?? [];
        }

        public async Task<bool> AddHomeMatchToTeam(long teamId, Match homeMatch)
        {
            if (homeMatch == null)
                throw new Exception("Match cannot be null");

            try
            {
                await _teamsRepository.AddHomeMatch(teamId, homeMatch);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> RemoveHomeMatchFromTeam(long teamId, long matchId)
        {
            try
            {
                await _teamsRepository.RemoveHomeMatch(teamId, matchId);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<IEnumerable<Match>> GetAwayHomeMembers(long teamId)
        {
            var team = await _teamsRepository.GetTeamWithMatches(teamId);
            return team?.AwayMatches ?? [];
        }

        public async Task<bool> AddAwayMatchToTeam(long teamId, Match awayMatch)
        {
            if (awayMatch == null)
                throw new Exception("Match cannot be null");

            try
            {
                await _teamsRepository.AddAwayMatch(teamId, awayMatch);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> RemoveAwayMatchFromTeam(long teamId, long matchId)
        {
            try
            {
                await _teamsRepository.RemoveAwayMatch(teamId, matchId);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<IEnumerable<Competitions>> GetTeamCompetitions(long teamId)
        {
            var team = await _teamsRepository.GetTeamWithParticipants(teamId);
            if (team == null)
                return [];

            return team.Participants
                .Select(p => p.Competition)
                .Distinct()
                .ToList();
        }

        public async Task<bool> AddCompetitionsToTeam(long teamId, Competitions competition)
        {
            if (competition == null)
                throw new Exception("Competition cannot be null");
            try
            {
                var team = await _teamsRepository.GetById(teamId);
                if (team == null || team.UserId <= 0)
                    return false;

                await _teamsRepository.AddParticipantToTeam(teamId, team.UserId, competition.Id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> RemoveCompetitionsFromTeam(long teamId, long competitionId)
        {
            try
            {
                var team = await _teamsRepository.GetTeamWithParticipants(teamId);
                if (team == null)
                    return false;

                var participant = team.Participants.FirstOrDefault(p => p.CompetitionId == competitionId);
                if (participant == null)
                    return false;

                await _teamsRepository.RemoveParticipantFromTeam(teamId, participant.Id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}

