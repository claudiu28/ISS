using Microsoft.IdentityModel.Tokens;
using Soccer.Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Soccer.Server.Utils
{
    public class Helper(IConfiguration configuration)
    {
        private readonly IConfiguration _config = configuration;
        public string CreatePasswordHash(string password)
        {
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            using var hmac = new HMACSHA512(salt);
            byte[] passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            byte[] hashBytes = new byte[salt.Length + passwordHash.Length];
            Array.Copy(salt, 0, hashBytes, 0, salt.Length);
            Array.Copy(passwordHash, 0, hashBytes, salt.Length, passwordHash.Length);

            return Convert.ToBase64String(hashBytes);
        }

        public bool VerifyPasswordHash(string password, string combinedHash)
        {
            byte[] hashBytes = Convert.FromBase64String(combinedHash);

            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            byte[] originalHash = new byte[hashBytes.Length - 16];
            Array.Copy(hashBytes, 16, originalHash, 0, originalHash.Length);

            using var hmac = new HMACSHA512(salt);
            byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            return computedHash.SequenceEqual(originalHash);
        }

        public string GenerateToken(User user)
        {
            var jwtSettings = _config.GetSection("JwtSettings");
            var secret = jwtSettings["Secret"] ?? throw new ("Secret");
            var issuer = jwtSettings["Issuer"] ?? throw new ("Issuer");
            var audience = jwtSettings["Audience"] ?? throw new ("Audience");
            var expirationMinutesString = jwtSettings["ExpirationMinutes"] ?? throw new ("ExpirationMinutes");
            var expirationMinutes = int.Parse(expirationMinutesString);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.Username)
            };

            foreach (var role in user.UserRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
