using Soccer.Server.Models;

namespace Soccer.Server.Services
{
    public interface IUserService 
    {
        Task<User?> GetById(long id);
        Task<List<User>> GetAll();
        Task Update(User entity);
        Task Delete(long id);
        Task<User?> GetByUsername(string username);
        Task<List<User>> GetByLastName(string lastName);
        Task<List<User>> GetByFirstName(string firstName);
        Task AddUserRole(long userId, string role);
        Task RemoveUserRole(long userId, string role);
        Task<List<string>> GetUserRoles(long userId);
        Task<List<Recipe>> GetRecipes(long userId);
        Task<List<Participant>> GetUserParticipations(long userId);
        Task<List<Competitions>> GetCompetitions(long userId);
        Task<List<Teams>> GetUserTeams(long userId);
        Task<User?> GetByIdWithAllNavigations(long id);
        Task AddRecipeToUser(long userId, Recipe recipe);
        Task AddTeamToUser(long userId, Teams team);
        Task AddCompetitionToUser(long userId, Competitions competition);
        Task AddParticipationToUser(long userId, long teamId, long competitionId);
        Task RemoveRecipeFromUser(long userId, long recipeId);
        Task RemoveTeamFromUser(long userId, long teamId);
        Task RemoveCompetitionFromUser(long userId, long competitionId);
        Task RemoveParticipationFromUser(long userId, long participantId);
    }
}
