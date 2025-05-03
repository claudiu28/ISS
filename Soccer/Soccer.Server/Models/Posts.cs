namespace Soccer.Server.Models
{
    public class Posts
    {
        public int Id { get; set; }
        public User User { get; set; } = null!;

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public string PostType { get; set; } = "News";

    }
}
