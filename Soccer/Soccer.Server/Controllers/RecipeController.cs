using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Soccer.Server.Dto;
using Soccer.Server.Models;
using Soccer.Server.Services;
using System.Security.Claims;

namespace Soccer.Server.Controllers
{

    [ApiController]
    [Route("api/recipe")]
    public class RecipeController(IRecipeService recipeService, IUserService userService) : ControllerBase
    {
        private readonly IRecipeService _recipeService = recipeService;
        private readonly IUserService _userService = userService;

        [HttpGet("my-recipes")]
        [Authorize]
        public async Task<IActionResult> GetMyRecipes()
        {
            var userId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var recipes = await _recipeService.GetRecipesByUserId(userId);
            return Ok(recipes);
        }

        [HttpPost("my-recipes")]
        [Authorize]
        public async Task<IActionResult> CreateMyRecipe([FromBody] RecipeCreateDto dto)
        {
            var userId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var user = await _userService.GetById(userId);
            var recipe = new Recipe
            {
                Name = dto.Name,
                Description = dto.Description,
                Ingredients = dto.Ingredients,
                Instructions = dto.Instructions,
                CreatedAt = DateTime.UtcNow,
                UserId = user.Id
            };


            var created = await _recipeService.CreateRecipe(recipe);

            var result = new RecipeReadDto
            {
                Id = created.Id,
                Name = created.Name,
                Description = created.Description,
                Ingredients = [.. created.Ingredients],
                Instructions = [.. created.Instructions],
                CreatedAt = created.CreatedAt,
                Username = created.User.Username 
            };

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var recipes = await _recipeService.GetAll();
            return Ok(recipes);
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetById(long id)
        {
            var recipe = await _recipeService.GetById(id);
            return recipe == null ? NotFound() : Ok(recipe);
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var recipes = await _recipeService.GetByName(name);
            return Ok(recipes);
        }

       

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatest([FromQuery] int count = 5)
        {
            var recipes = await _recipeService.GetLatestRecipes(count);
            return Ok(recipes);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string keyword)
        {
            var recipes = await _recipeService.SearchAllRecipes(keyword);
            return Ok(recipes);
        }

        [HttpPut("{id:long}")]
        [Authorize]
        public async Task<IActionResult> Update(long id, [FromBody] RecipeCreateDto dto)
        {
            var recipe = await _recipeService.GetById(id);
            if (recipe == null)
                return NotFound();

            recipe.Name = dto.Name;
            recipe.Description = dto.Description;
            recipe.Ingredients = dto.Ingredients;
            recipe.Instructions = dto.Instructions;

            var updated = await _recipeService.UpdateRecipe(recipe);
            return Ok(updated);
        }

        [HttpDelete("{id:long}")]
        [Authorize]
        public async Task<IActionResult> Delete(long id)
        {
            var deleted = await _recipeService.DeleteRecipe(id);
            return deleted == null ? NotFound() : Ok(deleted);
        }
    }

}

