using Microsoft.EntityFrameworkCore;
using Soccer.Server.Data;
using Soccer.Server.Models;


namespace Soccer.Server.Repositories
{
    public class UserRepository(AppContextDb context) : IUserRepository
    {
        private readonly AppContextDb _context = context;
        private readonly DbSet<User> _dbSet = context.Set<User>();

        public async Task<User?> GetById(long id)
        {
            var user = await _dbSet.FirstOrDefaultAsync(u => Equals(u.Id, id));
            if (user == null)
            {
                return null;
            }
            return user;
        }

        public Task<List<User>> GetAll()
        {
            return _dbSet.ToListAsync();
        }

        public async Task Create(User entity)
        {
            _dbSet.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(User entity)
        {
             _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            var user = await _dbSet.FirstOrDefaultAsync(u => Equals(u.Id, id)) ?? throw new Exception("User not found!");
            _dbSet.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<List<Posts>> GetPosts(long userId)
        {
           return await _context.Posts.Where(p => Equals(p.User.Id,userId)).ToListAsync();
        }

        public async Task<List<Recipe>> GetRecipes(long userId)
        {
            return await _context.Recipes.Where(r => Equals(r.User.Id, userId)).ToListAsync();
        }

        public async Task<List<Participant>> GetUserParticipations(long userId)
        {
            return await _context.Participants.Where(p => Equals(p.User.Id, userId)).ToListAsync();
        }

        public async Task<List<Competitions>> GetCompetitions(long userId)
        {
            return await _context.Competitions.Where(c => Equals(c.Creator.Id, userId)).ToListAsync();
        }

        public async Task<List<Teams>> GetUserTeams(long userId)
        {
            return await _context.Teams.Where(t => Equals(t.Owner.Id, userId)).ToListAsync();
        }

        public async Task<User?> GetByUsername(string username)
        {
            var user = await _dbSet.FirstOrDefaultAsync(x => Equals(x.Username,username));
            if (user == null)
            {
                return null;
            }
            return user;
        }

        public async Task<List<User>> GetByLastName(string lastName)
        {

            return await _dbSet.Where(x => Equals(x.LastName, lastName)).ToListAsync();
           
        }

        public async Task<List<User>> GetByFirstName(string firstName)
        {
            return await _dbSet.Where(x => Equals(x.FirstName, firstName)).ToListAsync();
        }


        public async Task AddUserRole(long userId, string role)
        {
            var user = await _dbSet.FirstOrDefaultAsync(x => Equals(x.Id, userId)) ?? throw new Exception("User not found in db!");
            user.UserRoles.Add(role);
            _dbSet.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveUserRole(long userId, string role)
        {
            var user = await _dbSet.FirstOrDefaultAsync(x => Equals(x.Id, userId)) ?? throw new Exception("User not found in db!");
            user.UserRoles.Remove(role);
            _dbSet.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<string>> GetUserRoles(long userId)
        {
            var user = await _dbSet.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return [];

            return [.. user.UserRoles];
        }
    }
}
