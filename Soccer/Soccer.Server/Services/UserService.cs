using Soccer.Server.Models;
using Soccer.Server.Repositories;

namespace Soccer.Server.Services
{
    public class UserService(IUserRepository userRepository) : IUserService
    {
        private readonly IUserRepository _userRepository = userRepository;

        public async Task AddUserRole(long userId, string role)
        {
            await _userRepository.AddUserRole(userId, role);
        }

        public async Task Delete(long id)
        {
            await _userRepository.Delete(id);
        }

        public Task<List<User>> GetAll()
        {
            return _userRepository.GetAll();
        }

        public async Task<List<User>> GetByFirstName(string firstName)
        {
            return await _userRepository.GetByFirstName(firstName);
        }

        public async Task<User?> GetById(long id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task<List<User>> GetByLastName(string lastName)
        {
            return await (_userRepository.GetByLastName(lastName));
        }

        public async Task<User?> GetByUsername(string username)
        {
            return await (_userRepository.GetByUsername(username));
        }

        public async Task<List<Competitions>> GetCompetitions(long userId)
        {
            return await _userRepository.GetCompetitions(userId);
        }



        public async Task<List<Recipe>> GetRecipes(long userId)
        {
            return await _userRepository.GetRecipes(userId);
        }

        public async Task<List<Participant>> GetUserParticipations(long userId)
        {
            return await _userRepository.GetUserParticipations(userId);
        }

        public async Task<List<string>> GetUserRoles(long userId)
        {
            return await _userRepository.GetUserRoles(userId);
        }

        public async Task<List<Teams>> GetUserTeams(long userId)
        {
            return await _userRepository.GetUserTeams(userId);
        }
        public async Task RemoveUserRole(long userId, string role)
        {
            await _userRepository.RemoveUserRole(userId, role);
        }
        public async Task Update(User entity)
        {
            await _userRepository.Update(entity);
        }
        public async Task<User?> GetByIdWithAllNavigations(long id)
        {
            return await _userRepository.GetByIdWithAllNavigations(id);
        }

        public async Task AddRecipeToUser(long userId, Recipe recipe)
        {
            await _userRepository.AddRecipeToUser(userId, recipe);
        }

        public async Task AddTeamToUser(long userId, Teams team)
        {
            await _userRepository.AddTeamToUser(userId, team);
        }

        public async Task AddCompetitionToUser(long userId, Competitions competition)
        {
            await _userRepository.AddCompetitionToUser(userId, competition);
        }

        public async Task AddParticipationToUser(long userId, long teamId, long competitionId)
        {
            await _userRepository.AddParticipationToUser(userId, teamId, competitionId);
        }

        public async Task RemoveRecipeFromUser(long userId, long recipeId)
        {
            await _userRepository.RemoveRecipeFromUser(userId, recipeId);
        }

        public async Task RemoveTeamFromUser(long userId, long teamId)
        {
            await _userRepository.RemoveTeamFromUser(userId, teamId);
        }

        public async Task RemoveCompetitionFromUser(long userId, long competitionId)
        {
            await _userRepository.RemoveCompetitionFromUser(userId, competitionId);
        }

        public async Task RemoveParticipationFromUser(long userId, long participantId)
        {
            await _userRepository.RemoveParticipationFromUser(userId, participantId);
        }
    }
}
