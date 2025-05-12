using Microsoft.EntityFrameworkCore;
using Soccer.Server.Data;
using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public class CompetionRepository(AppContextDb context) : ICompetionRepository
    {
        private readonly AppContextDb _context = context;
        private readonly DbSet<Competitions> _competitions = context.Competitions;

     
        public async Task<Competitions?> GetById(long id)
        {
            return await _competitions.FindAsync(id);
        }

        public async Task<List<Competitions>> GetAll()
        {
            return await _competitions.ToListAsync();
        }

        public async Task Create(Competitions entity)
        {
            await _competitions.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Competitions entity)
        {
            _competitions.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            var competition = await _competitions.FindAsync(id);
            if (competition == null)
                throw new Exception($"Competition with id {id} not found");

            _competitions.Remove(competition);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public IQueryable<Competitions> Query()
        {
            return _competitions.AsQueryable();
        }

        public async Task<Competitions?> GetCompetitionWithParticipants(long competitionId)
        {
            return await _competitions
                .Include(c => c.CompetitionParticipants)
                    .ThenInclude(p => p.User)
                .Include(c => c.CompetitionParticipants)
                    .ThenInclude(p => p.Team)
                .Include(c => c.Creator)
                .FirstOrDefaultAsync(c => c.Id == competitionId);
        }

        public async Task<Competitions?> GetCompetitionWithMatches(long competitionId)
        {
            return await _competitions
                .Include(c => c.CompetitionsMetches)
                    .ThenInclude(m => m.HomeTeam)
                .Include(c => c.CompetitionsMetches)
                    .ThenInclude(m => m.AwayTeam)
                .FirstOrDefaultAsync(c => c.Id == competitionId);
        }

        public async Task<List<Teams>> GetCompetitionTeams(long competitionId)
        {
            var teams = await _context.Participants
                .Where(p => p.CompetitionId == competitionId)
                .Include(p => p.Team)
                .Select(p => p.Team)
                .Distinct()
                .ToListAsync();

            return teams;
        }

        public async Task<List<User>> GetCompetitionParticipants(long competitionId)
        {
            var users = await _context.Participants
                .Where(p => p.CompetitionId == competitionId)
                .Include(p => p.User)
                .Select(p => p.User)
                .Distinct()
                .ToListAsync();

            return users;
        }

        public async Task AddParticipantToCompetition(long competitionId, long userId, long teamId)
        {
            var competition = await _competitions.FindAsync(competitionId);
            if (competition == null)
                throw new Exception($"Competition with id {competitionId} not found");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            var team = await _context.Teams.FindAsync(teamId);
            if (team == null)
                throw new Exception($"Team with id {teamId} not found");

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

        public async Task AddMatchToCompetition(long competitionId, Match match)
        {
            var competition = await _competitions.FindAsync(competitionId);
            if (competition == null)
                throw new Exception($"Competition with id {competitionId} not found");

            match.CompetitionId = competitionId;
            match.Competition = competition;

            if (match.HomeTeamId > 0)
            {
                var homeTeam = await _context.Teams.FindAsync(match.HomeTeamId);
                if (homeTeam == null)
                    throw new Exception($"Home team with id {match.HomeTeamId} not found");

                match.HomeTeam = homeTeam;
            }

            if (match.AwayTeamId > 0)
            {
                var awayTeam = await _context.Teams.FindAsync(match.AwayTeamId);
                if (awayTeam == null)
                    throw new Exception($"Away team with id {match.AwayTeamId} not found");

                match.AwayTeam = awayTeam;
            }

            await _context.Matches.AddAsync(match);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveParticipantFromCompetition(long competitionId, long participantId)
        {
            var competition = await _competitions.FindAsync(competitionId);
            if (competition == null)
                throw new Exception($"Competition with id {competitionId} not found");

            var participant = await _context.Participants.FindAsync(participantId);
            if (participant == null)
                throw new Exception($"Participant with id {participantId} not found");

            if (participant.CompetitionId != competitionId)
                throw new Exception($"Participant with id {participantId} is not a part of competition with id {competitionId}");

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();
        }


        public async Task RemoveMatchFromCompetition(long competitionId, long matchId)
        {
            var competition = await _competitions.FindAsync(competitionId);
            if (competition == null)
                throw new Exception($"Competition with id {competitionId} not found");

            var match = await _context.Matches.FindAsync(matchId);
            if (match == null)
                throw new Exception($"Match with id {matchId} not found");

            if (match.CompetitionId != competitionId)
                throw new Exception($"Match with id {matchId} is not a part of competition with id {competitionId}");

            _context.Matches.Remove(match);
            await _context.SaveChangesAsync();
        }
    }
}
