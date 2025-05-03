using Soccer.Server.Models;
using Soccer.Server.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Soccer.Server.Services
{
    public class RecipeService(IRecipeRepository recipeRepository) : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository = recipeRepository;

        public async Task<IEnumerable<Recipe>> GetRecipesByUserId(long userId)
        {
            return await _recipeRepository.Query()
                .Where(r => r.User.Id == userId)
                .ToListAsync();
        }

        public async Task<Recipe?> GetById(long id)
        {
            return await _recipeRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Recipe>> GetAll()
        {
            return await _recipeRepository.GetAllAsync();
        }

        public async Task<IEnumerable<Recipe>> GetByName(string name)
        {
            return await _recipeRepository.GetRecipesByNameAsync(name) ?? [];
        }

        public async Task<Recipe?> CreateRecipe(Recipe recipe)
        {
            return await _recipeRepository.AddAsync(recipe);
        }

        public async Task<Recipe?> UpdateRecipe(Recipe recipe)
        {
            return await _recipeRepository.UpdateAsync(recipe);
        }

        public async Task<Recipe?> DeleteRecipe(long id)
        {
            return await _recipeRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Recipe>> GetLatestRecipes(int count)
        {
            return await _recipeRepository.Query()
                .OrderByDescending(r => r.CreatedAt)
                .Take(count)
                .ToListAsync();
        }

        public async Task<IEnumerable<Recipe>> SearchAllRecipes(string keyword)
        {
            return await _recipeRepository.Query()
                 .Where(r =>
                     r.Name.ToLower().Contains(keyword.ToLower()) ||
                     r.Description.ToLower().Contains(keyword.ToLower()))
                 .ToListAsync();
        }
    }

}


