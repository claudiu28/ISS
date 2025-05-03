namespace Soccer.Server.Dto
{
    public class RegisterDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string VerifyPassword { get; set; } = string.Empty;
    }
}
