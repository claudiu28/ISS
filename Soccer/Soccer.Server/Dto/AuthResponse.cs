namespace Soccer.Server.Dto
{
    public class AuthResponseDto
    {
        public string Username { get; set; } = string.Empty;
        public List<string> Roles { get; set; } = [];
        public string Token { get; set; } = string.Empty;
    }
}
