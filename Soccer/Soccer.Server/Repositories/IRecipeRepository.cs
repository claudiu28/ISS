using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public interface IRecipeRepository
    {
        Task<Recipe?> GetByIdAsync(long id);
        Task<IEnumerable<Recipe>> GetAllAsync();
        Task<IEnumerable<Recipe>> GetRecipesByUserAsync(User user);
        Task<IEnumerable<Recipe>> GetRecipesByNameAsync(string name);
        Task<IEnumerable<Recipe>> GetRecipesByIngredientsAsync(string[] ingredients);
        Task<Recipe> AddAsync(Recipe entity);
        Task<Recipe?> UpdateAsync(Recipe entity);
        Task<Recipe?> DeleteAsync(long id);
        IQueryable<Recipe> Query();
    }
}
