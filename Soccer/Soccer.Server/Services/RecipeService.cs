using Soccer.Server.Models;
using Soccer.Server.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Soccer.Server.Services
{
    public class RecipeService(IRecipeRepository recipeRepository) : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository = recipeRepository;

        public async Task<Recipe?> GetById(long id)
        {
            return await _recipeRepository.GetById(id);
        }

        public async Task<IEnumerable<Recipe>> GetAll()
        {
            return await _recipeRepository.GetAll();
        }

        public async Task<IEnumerable<Recipe>> GetByName(string name)
        {
            return await _recipeRepository.Query()
                .Where(r => r.Name.ToLower().Contains(name.ToLower()))
                .ToListAsync();
        }

        public async Task<Recipe?> CreateRecipe(Recipe recipe)
        {

            await _recipeRepository.Create(recipe);
            return recipe;
        }

        public async Task<Recipe?> UpdateRecipe(Recipe recipe)
        {
            var existingRecipe = await _recipeRepository.GetById(recipe.Id);
            if (existingRecipe == null)
                throw new Exception("Recipe not found");
            await _recipeRepository.Update(recipe);
            return recipe;
        }

        public async Task<Recipe?> DeleteRecipe(long id)
        {
            var recipe = await _recipeRepository.GetById(id);
            if (recipe == null)
                throw new Exception("Recipe not found");

            await _recipeRepository.Delete(id);
            return recipe;
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
            if (string.IsNullOrEmpty(keyword))
                return await GetLatestRecipes(10);

            return await _recipeRepository.Query()
                .Where(r =>
                    r.Name.ToLower().Contains(keyword.ToLower()) ||
                    r.Description.ToLower().Contains(keyword.ToLower())
                ) 
                .ToListAsync();
        }

        public async Task<IEnumerable<Recipe>> GetRecipesByUserId(long userId)
        {
            return await _recipeRepository.Query()
                .Where(r => r.UserId == userId)
                .ToListAsync();
        }
    }

}


