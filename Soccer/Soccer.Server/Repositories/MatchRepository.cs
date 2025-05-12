using Microsoft.EntityFrameworkCore;
using Soccer.Server.Data;
using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public class MatchRepository(AppContextDb context)
    {
        private readonly AppContextDb _context = context;
        private readonly DbSet<Match> _matches = context.Matches;

      
        public async Task<Match?> GetById(long id)
        {
            return await _matches.FindAsync(id);
        }

        public async Task<List<Match>> GetAll()
        {
            return await _matches.ToListAsync();
        }

        public async Task Create(Match entity)
        {
            await _matches.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Match entity)
        {
            _matches.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            var match = await _matches.FindAsync(id);
            if (match == null)
                throw new Exception($"Match with id {id} not found");

            _matches.Remove(match);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public IQueryable<Match> Query()
        {
            return _matches.AsQueryable();
        }

        public async Task<Match?> GetMatchWithTeams(long matchId)
        {
            return await _matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .FirstOrDefaultAsync(m => m.Id == matchId);
        }

        public async Task<List<Match>> GetMatchesByCompetition(long competitionId)
        {
            return await _matches
                .Where(m => m.CompetitionId == competitionId)
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .ToListAsync();
        }

        public async Task<List<Match>> GetMatchesByTeam(long teamId)
        {
            return await _matches
                .Where(m => m.HomeTeamId == teamId || m.AwayTeamId == teamId)
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.Competition)
                .ToListAsync();
        }

        public async Task CreateMatch(long homeTeamId, long awayTeamId, long competitionId, Match match)
        {
            var homeTeam = await _context.Teams.FindAsync(homeTeamId);
            if (homeTeam == null)
                throw new Exception($"Home team with id {homeTeamId} not found");

            var awayTeam = await _context.Teams.FindAsync(awayTeamId);
            if (awayTeam == null)
                throw new Exception($"Away team with id {awayTeamId} not found");

            var competition = await _context.Competitions.FindAsync(competitionId);
            if (competition == null)
                throw new Exception($"Competition with id {competitionId} not found");

            if (homeTeamId == awayTeamId)
                throw new Exception("Home team and away team cannot be the same");

            match.HomeTeamId = homeTeamId;
            match.HomeTeam = homeTeam;
            match.AwayTeamId = awayTeamId;
            match.AwayTeam = awayTeam;
            match.CompetitionId = competitionId;
            match.Competition = competition;

            await _matches.AddAsync(match);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateMatchResult(long matchId, string result)
        {
            var match = await _matches.FindAsync(matchId);
            if (match == null)
                throw new Exception($"Match with id {matchId} not found");

            match.Result = result;
            await _context.SaveChangesAsync();
        }
    }
}
