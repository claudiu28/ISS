using Soccer.Server.Models;

namespace Soccer.Server.Services
{
    public interface IRecipeService
    {

        Task<Recipe?> GetById(long id);
        Task<IEnumerable<Recipe>> GetAll();
        Task<IEnumerable<Recipe>> GetByName(string name);
        Task<Recipe?> CreateRecipe(Recipe recipe);
        Task<Recipe?> UpdateRecipe(Recipe recipe);
        Task<Recipe?> DeleteRecipe(long id);
        Task<IEnumerable<Recipe>> GetLatestRecipes(int count);
        Task<IEnumerable<Recipe>> SearchAllRecipes(string keyword);
        Task<IEnumerable<Recipe>> GetRecipesByUserId(long userId);
    }
}
