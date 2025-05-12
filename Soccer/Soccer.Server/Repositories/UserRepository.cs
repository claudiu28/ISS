using Microsoft.EntityFrameworkCore;
using Soccer.Server.Data;
using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public class UserRepository(AppContextDb context) : IUserRepository
    {
        private readonly AppContextDb _context = context;
        private readonly DbSet<User> _users = context.Set<User>();

        public async Task<User?> GetById(long id)
        {
            return await _users.FindAsync(id);
        }

        public async Task<User?> GetByIdWithAllNavigations(long id)
        {
            return await _users.Include(u => u.UserRecipes).Include(u => u.OwnedTeams).Include(u => u.UserCompetitionsCreated)
                .Include(u => u.UserParticipations)
                    .ThenInclude(p => p.Team)
                .Include(u => u.UserParticipations)
                    .ThenInclude(p => p.Competition)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public Task<List<User>> GetAll()
        {
            return _users.ToListAsync();
        }

        public async Task Create(User entity)
        {
            await _users.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(User entity)
        {
            _users.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            var user = await _users.FindAsync(id);
            if (user == null)
                throw new Exception("User not found!");

            _users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<List<Recipe>> GetRecipes(long userId)
        {
            return await _context.Recipes
                .Where(r => r.UserId == userId)
                .ToListAsync();
        }

        public async Task<List<Participant>> GetUserParticipations(long userId)
        {
            return await _context.Participants
                .Where(p => p.UserId == userId)
                .Include(p => p.Team)
                .Include(p => p.Competition)
                .ToListAsync();
        }

        public async Task<List<Competitions>> GetCompetitions(long userId)
        {
            return await _context.Competitions
                .Where(c => c.CreatorId == userId)
                .ToListAsync();
        }

        public async Task<List<Teams>> GetUserTeams(long userId)
        {
            return await _context.Teams
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<User?> GetByUsername(string username)
        {
            return await _users.FirstOrDefaultAsync(x => x.Username == username);
        }

        public async Task<List<User>> GetByLastName(string lastName)
        {
            return await _users.Where(x => x.LastName == lastName).ToListAsync();
        }

        public async Task<List<User>> GetByFirstName(string firstName)
        {
            return await _users.Where(x => x.FirstName == firstName).ToListAsync();
        }

        public async Task AddUserRole(long userId, string role)
        {
            var user = await _users.FindAsync(userId);
            if (user == null)
                throw new Exception("User not found in db!");

            if (!user.UserRoles.Contains(role))
            {
                user.UserRoles.Add(role);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveUserRole(long userId, string role)
        {
            var user = await _users.FindAsync(userId);
            if (user == null)
                throw new Exception("User not found in db!");

            if (user.UserRoles.Contains(role))
            {
                user.UserRoles.Remove(role);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<string>> GetUserRoles(long userId)
        {
            var user = await _users.FindAsync(userId);
            if (user == null) return [];

            return [.. user.UserRoles];
        }

        public IQueryable<User> Query()
        {
            return _users.AsQueryable();
        }

        public async Task AddRecipeToUser(long userId, Recipe recipe)
        {
            var user = await _users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            recipe.UserId = userId;
            recipe.User = user;

            await _context.Recipes.AddAsync(recipe);
            await _context.SaveChangesAsync();
        }

        public async Task AddTeamToUser(long userId, Teams team)
        {
            var user = await _users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            team.UserId = userId;
            team.Owner = user;

            await _context.Teams.AddAsync(team);
            await _context.SaveChangesAsync();
        }

        public async Task AddCompetitionToUser(long userId, Competitions competition)
        {
            var user = await _users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            competition.CreatorId = userId;
            competition.Creator = user;

            await _context.Competitions.AddAsync(competition);
            await _context.SaveChangesAsync();
        }

        public async Task AddParticipationToUser(long userId, long teamId, long competitionId)
        {
            var user = await _users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            var team = await _context.Teams.FindAsync(teamId);
            if (team == null)
                throw new Exception($"Team with id {teamId} not found");

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

        public async Task RemoveRecipeFromUser(long userId, long recipeId)
        {
            var user = await _users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            var recipe = await _context.Recipes.FindAsync(recipeId);
            if (recipe == null)
                throw new Exception($"Recipe with id {recipeId} not found");

            if (recipe.UserId != userId)
                throw new Exception($"Recipe with id {recipeId} doesn't belong to user with id {userId}");

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveTeamFromUser(long userId, long teamId)
        {
            var user = await _users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            var team = await _context.Teams.FindAsync(teamId);
            if (team == null)
                throw new Exception($"Team with id {teamId} not found");

            if (team.UserId != userId)
                throw new Exception($"Team with id {teamId} doesn't belong to user with id {userId}");

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveCompetitionFromUser(long userId, long competitionId)
        {
            var user = await _users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            var competition = await _context.Competitions.FindAsync(competitionId);
            if (competition == null)
                throw new Exception($"Competition with id {competitionId} not found");

            if (competition.CreatorId != userId)
                throw new Exception($"Competition with id {competitionId} doesn't belong to user with id {userId}");

            _context.Competitions.Remove(competition);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveParticipationFromUser(long userId, long participantId)
        {
            var user = await _users.FindAsync(userId);
            if (user == null)
                throw new Exception($"User with id {userId} not found");

            var participant = await _context.Participants.FindAsync(participantId);
            if (participant == null)
                throw new Exception($"Participant with id {participantId} not found");

            if (participant.UserId != userId)
                throw new Exception($"Participation with id {participantId} doesn't belong to user with id {userId}");

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();
        }
    }
}

