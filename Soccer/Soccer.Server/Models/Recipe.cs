namespace Soccer.Server.Models
{
    public class Recipe
    {
        public long Id { get; set; }
        public long UserId { get; set; }         
        public User User { get; set; } = null!;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty ;
        public ICollection<string> Ingredients { get; set; } = [];
        public ICollection<string> Instructions { get; set; } = [];
        public DateTime CreatedAt { get; set; }
       
    }
}
