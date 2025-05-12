using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public interface IParticipantRepository : IRepository<Participant>
    {
        Task<List<Participant>> GetParticipantsByCompetition(long competitionId);
        Task<List<Participant>> GetParticipantsByTeam(long teamId);
        Task<List<Participant>> GetParticipantsByUser(long userId);
        Task<Participant?> GetParticipantByIds(long userId, long teamId, long competitionId);
        Task UpdateParticipantStatus(long participantId, string status);
        Task CreateParticipant(long userId, long teamId, long competitionId, string status = "Pending");
    }
}
