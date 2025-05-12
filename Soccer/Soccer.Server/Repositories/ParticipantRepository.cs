using Microsoft.EntityFrameworkCore;
using Soccer.Server.Data;
using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public class ParticipantRepository(AppContextDb context) : IParticipantRepository
    {
        private readonly AppContextDb _context = context;
        private readonly DbSet<Participant> _participants = context.Participants;

        public async Task<Participant?> GetById(long id)
        {
            return await _participants.FindAsync(id);
        }

        public async Task<List<Participant>> GetAll()
        {
            return await _participants.ToListAsync();
        }

        public async Task Create(Participant entity)
        {
            await _participants.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Participant entity)
        {
            _participants.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            var participant = await _participants.FindAsync(id);
            if (participant == null)
                throw new Exception($"Participant with id {id} not found");

            _participants.Remove(participant);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public IQueryable<Participant> Query()
        {
            return _participants.AsQueryable();
        }

        public async Task<List<Participant>> GetParticipantsByCompetition(long competitionId)
        {
            return await _participants
                .Where(p => p.CompetitionId == competitionId)
                .Include(p => p.User)
                .Include(p => p.Team)
                .ToListAsync();
        }

        public async Task<List<Participant>> GetParticipantsByTeam(long teamId)
        {
            return await _participants
                .Where(p => p.TeamId == teamId)
                .Include(p => p.User)
                .Include(p => p.Competition)
                .ToListAsync();
        }

        public async Task<List<Participant>> GetParticipantsByUser(long userId)
        {
            return await _participants
                .Where(p => p.UserId == userId)
                .Include(p => p.Team)
                .Include(p => p.Competition)
                .ToListAsync();
        }

        public async Task<Participant?> GetParticipantByIds(long userId, long teamId, long competitionId)
        {
            return await _participants
                .FirstOrDefaultAsync(p =>
                    p.UserId == userId &&
                    p.TeamId == teamId &&
                    p.CompetitionId == competitionId);
        }

        public async Task UpdateParticipantStatus(long participantId, string status)
        {
            var participant = await _participants.FindAsync(participantId);
            if (participant == null)
                throw new Exception($"Participant with id {participantId} not found");

            participant.Status = status;
            await _context.SaveChangesAsync();
        }

        public async Task CreateParticipant(long userId, long teamId, long competitionId, string status = "Pending")
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            var team = await _context.Teams.FindAsync(teamId);
            if (team == null)
                throw new Exception($"Team with id {teamId} not found");

            var competition = await _context.Competitions.FindAsync(competitionId);
            if (competition == null)
                throw new Exception($"Competition with id {competitionId} not found");

            var existingParticipation = await _participants
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
                Status = status
            };

            await _participants.AddAsync(participant);
            await _context.SaveChangesAsync();
        }
    }
}
