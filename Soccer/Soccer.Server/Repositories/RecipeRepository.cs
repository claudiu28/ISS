using Microsoft.EntityFrameworkCore;
using Soccer.Server.Data;
using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public class RecipeRepository(AppContextDb context) : IRecipeRepository
    {
        private readonly AppContextDb _context = context;
        private readonly DbSet<Recipe> _recipes = context.Recipes;

        public async Task<Recipe?> GetById(long id)
        {
            return await _recipes.FindAsync(id);
        }

        public async Task<List<Recipe>> GetAll()
        {
            return await _recipes.Include(u => u.User).ToListAsync();
        }

        public async Task Create(Recipe entity)
        {
            await _recipes.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Recipe entity)
        {
            _recipes.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            var recipe = await _recipes.FindAsync(id);
            if (recipe == null)
                throw new Exception($"Recipe with id {id} not found");

            _recipes.Remove(recipe);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public IQueryable<Recipe> Query()
        {
            return _recipes.Include(u => u.User).AsQueryable();
        }

        public async Task<Recipe?> GetRecipeWithUser(long recipeId)
        {
            return await _recipes
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == recipeId);
        }
    }
}

