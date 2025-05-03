using Soccer.Server.Dto;
using Soccer.Server.Models;
using Soccer.Server.Repositories;
using Soccer.Server.Utils;

namespace Soccer.Server.Services
{
    public class AuthService(IUserRepository userRepository, Helper helper) : IAuthService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly Helper _helper = helper;

        public async Task<AuthResponseDto> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetByUsername(loginDto.Username) ?? throw new Exception("Invalid credentials!");
            if (!_helper.VerifyPasswordHash(loginDto.Password, user.PasswordHash))
            {
                throw new Exception("Invalid credentials!");
            }

            var token = _helper.GenerateToken(user);

            return new AuthResponseDto
            {
                Username = user.Username,
                Token = token,
                Roles = [.. user.UserRoles],
            };
        }

        public async Task<User> Register(RegisterDto registerDto)
        {
            if (registerDto.Password != registerDto.VerifyPassword)
            {
                throw new Exception("Password do not match");
            }
            var user = await _userRepository.GetByUsername(registerDto.Username);
            if (user != null)
            {
                throw new Exception("User already exists!");
            }
            var hash = _helper.CreatePasswordHash(registerDto.Password);

            var newUser = new User
            {
                Username = registerDto.Username,
                PasswordHash = hash,
                UserRoles = ["User"],
                CreateAt = DateTime.Now,
            };
            await _userRepository.Create(newUser);
            return newUser;
        }
    }

}