namespace Soccer.Server.Dto
{
    public class RecipeReadDto
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Ingredients { get; set; } = new();
        public List<string> Instructions { get; set; } = new();
        public DateTime CreatedAt { get; set; }
        public string Username { get; set; } = string.Empty;
    }
}
