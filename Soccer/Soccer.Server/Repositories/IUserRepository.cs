using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByUsername(string username);
        Task <List<User>> GetByLastName(string lastName);
        Task<List<User>> GetByFirstName(string firstName);
        Task AddUserRole(long userId, string role);
        Task RemoveUserRole(long userId, string role);
        Task<List<string>> GetUserRoles(long userId);
        Task<List<Posts>> GetPosts(long userId);
        Task<List<Recipe>> GetRecipes(long userId);
        Task<List<Participant>> GetUserParticipations(long userId);
        Task<List<Competitions>> GetCompetitions(long userId);
        Task<List<Teams>> GetUserTeams(long userId);


    }
}
