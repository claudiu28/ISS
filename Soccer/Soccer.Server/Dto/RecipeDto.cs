namespace Soccer.Server.Dto
{
    public class RecipeCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Ingredients { get; set; } = [];
        public List<string> Instructions { get; set; } = [];
    }
}
