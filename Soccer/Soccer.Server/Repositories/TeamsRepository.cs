using Microsoft.EntityFrameworkCore;
using Soccer.Server.Data;
using Soccer.Server.Models;
using System;

namespace Soccer.Server.Repositories
{
    public class TeamsRepository(AppContextDb context) : ITeamsRepository
    {
        private readonly AppContextDb _context = context;
        private readonly DbSet<Teams> _teams = context.Teams;
        public async Task<Teams?> GetById(long id)
        {
            return await _teams.FindAsync(id);
        }

        public async Task<List<Teams>> GetAll()
        {
            return await _teams.ToListAsync();
        }

        public async Task Create(Teams entity)
        {
            await _teams.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Teams entity)
        {
            _teams.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            var team = await _teams.FindAsync(id);
            if (team == null)
                throw new Exception($"Team with id {id} not found");

            _teams.Remove(team);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public IQueryable<Teams> Query()
        {
            return _teams.AsQueryable();
        }

        public async Task<Teams?> GetTeamWithParticipants(long teamId)
        {
            return await _teams
                .Include(t => t.Participants)
                    .ThenInclude(p => p.User)
                .Include(t => t.Owner)
                .FirstOrDefaultAsync(t => t.Id == teamId);
        }

        public async Task<Teams?> GetTeamWithMatches(long teamId)
        {
            return await _teams
                .Include(t => t.HomeMatches)
                .Include(t => t.AwayMatches)
                .FirstOrDefaultAsync(t => t.Id == teamId);
        }

        public async Task<List<User>> GetTeamMembers(long teamId)
        {
            var participants = await _context.Participants
                .Where(p => p.TeamId == teamId)
                .Include(p => p.User)
                .Select(p => p.User)
                .Distinct()
                .ToListAsync();

            return participants;
        }

        public async Task<bool> IsUserInTeam(long teamId, long userId)
        {
            return await _context.Participants
                .AnyAsync(p => p.TeamId == teamId && p.UserId == userId);
        }

        public async Task AddParticipantToTeam(long teamId, long userId, long competitionId)
        {
            var team = await _teams.FindAsync(teamId);
            if (team == null)
                throw new Exception($"Team with id {teamId} not found");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            var competition = await _context.Competitions.FindAsync(competitionId);
            if (competition == null)
                throw new Exception($"Competition with id {competitionId} not found");

            var existingParticipation = await _context.Participants
                .AnyAsync(p => p.UserId == userId && p.TeamId == teamId && p.CompetitionId == competitionId);

            if (existingParticipation)
                throw new Exception("User is already participating in this competition with this team");

            var participant = new Participant
            {
                UserId = userId,
                User = user,
                TeamId = teamId,
                Team = team,
                CompetitionId = competitionId,
                Competition = competition,
                Status = "Pending"
            };

            await _context.Participants.AddAsync(participant);
            await _context.SaveChangesAsync();
        }

        public async Task AddHomeMatch(long teamId, Match match)
        {
            var team = await _teams.FindAsync(teamId);
            if (team == null)
                throw new Exception($"Team with id {teamId} not found");

            match.HomeTeamId = teamId;
            match.HomeTeam = team;

            if (match.AwayTeamId > 0)
            {
                var awayTeam = await _teams.FindAsync(match.AwayTeamId);
                if (awayTeam == null)
                    throw new Exception($"Away team with id {match.AwayTeamId} not found");

                match.AwayTeam = awayTeam;
            }

            if (match.CompetitionId > 0)
            {
                var competition = await _context.Competitions.FindAsync(match.CompetitionId);
                if (competition == null)
                    throw new Exception($"Competition with id {match.CompetitionId} not found");

                match.Competition = competition;
            }

            await _context.Matches.AddAsync(match);
            await _context.SaveChangesAsync();
        }

        public async Task AddAwayMatch(long teamId, Match match)
        {
            var team = await _teams.FindAsync(teamId);
            if (team == null)
                throw new Exception($"Team with id {teamId} not found");

            match.AwayTeamId = teamId;
            match.AwayTeam = team;

            if (match.HomeTeamId > 0)
            {
                var homeTeam = await _teams.FindAsync(match.HomeTeamId);
                if (homeTeam == null)
                    throw new Exception($"Home team with id {match.HomeTeamId} not found");

                match.HomeTeam = homeTeam;
            }

            if (match.CompetitionId > 0)
            {
                var competition = await _context.Competitions.FindAsync(match.CompetitionId);
                if (competition == null)
                    throw new Exception($"Competition with id {match.CompetitionId} not found");

                match.Competition = competition;
            }

            await _context.Matches.AddAsync(match);
            await _context.SaveChangesAsync();
        }
        public async Task RemoveParticipantFromTeam(long teamId, long participantId)
        {
            var team = await _teams.FindAsync(teamId);
            if (team == null)
                throw new Exception($"Team with id {teamId} not found");

            var participant = await _context.Participants.FindAsync(participantId);
            if (participant == null)
                throw new Exception($"Participant with id {participantId} not found");

            if (participant.TeamId != teamId)
                throw new Exception($"Participant with id {participantId} is not a member of team with id {teamId}");

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();
        }
        public async Task RemoveHomeMatch(long teamId, long matchId)
        {
            var team = await _teams.FindAsync(teamId);
            if (team == null)
                throw new Exception($"Team with id {teamId} not found");

            var match = await _context.Matches.FindAsync(matchId);
            if (match == null)
                throw new Exception($"Match with id {matchId} not found");

            if (match.HomeTeamId != teamId)
                throw new Exception($"Match with id {matchId} is not a home match for team with id {teamId}");

            _context.Matches.Remove(match);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveAwayMatch(long teamId, long matchId)
        {
            var team = await _teams.FindAsync(teamId);
            if (team == null)
                throw new Exception($"Team with id {teamId} not found");

            var match = await _context.Matches.FindAsync(matchId);
            if (match == null)
                throw new Exception($"Match with id {matchId} not found");

            if (match.AwayTeamId != teamId)
                throw new Exception($"Match with id {matchId} is not an away match for team with id {teamId}");

            _context.Matches.Remove(match);
            await _context.SaveChangesAsync();
        }
    }
}

