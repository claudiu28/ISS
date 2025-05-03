using Microsoft.EntityFrameworkCore;
using Soccer.Server.Data;
using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public class RecipeRepository(AppContextDb context) : IRecipeRepository
    {
        private readonly AppContextDb _context = context;

        
        public async Task<Recipe?> GetByIdAsync(long id)
        {
            return await _context.Recipes.FindAsync(id);
        }

        public async Task<IEnumerable<Recipe>> GetAllAsync()
        {
            return await _context.Recipes
                .Include(r => r.User)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Recipe>> GetRecipesByUserAsync(User user)
        {
            return await _context.Recipes
                .Where(r => r.User.Id == user.Id)
                .ToListAsync();
        }

        public async Task<IEnumerable<Recipe>> GetRecipesByNameAsync(string name)
        {
            return await _context.Recipes.Where(r => r.Name == name)
                .ToListAsync();
        }

        public async Task<IEnumerable<Recipe>> GetRecipesByIngredientsAsync(string[] ingredients)
        {
           
            return await _context.Recipes
                .Where(r => ingredients.All(i => r.Ingredients.Contains(i)))
                .ToListAsync();
        }

      
        public async Task<Recipe> AddAsync(Recipe entity)
        {
            await _context.Recipes.AddAsync(entity);
            await _context.SaveChangesAsync(); 
            return entity;
        }

        public async Task<Recipe?> UpdateAsync(Recipe entity)
        {
            var recipe = await _context.Recipes.FindAsync(entity.Id);
            if (recipe == null) return null;

            recipe.Name = entity.Name;
            recipe.Description = entity.Description;
            recipe.Ingredients = entity.Ingredients;
            recipe.Instructions = entity.Instructions;

            _context.Recipes.Update(recipe);
            await _context.SaveChangesAsync(); 
            return recipe;
        }

        public async Task<Recipe?> DeleteAsync(long id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null) return null;

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync(); 
            return recipe;
        }

        public IQueryable<Recipe> Query()
        {
            return _context.Recipes.AsQueryable();
        }
    }
}
