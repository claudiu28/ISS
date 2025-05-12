using Soccer.Server.Models;

namespace Soccer.Server.Repositories
{
    public interface IRecipeRepository : IRepository<Recipe>
    {
        Task<Recipe?> GetRecipeWithUser(long recipeId);
    }
}
