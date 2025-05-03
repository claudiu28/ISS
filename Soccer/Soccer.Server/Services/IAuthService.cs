using Soccer.Server.Dto;
using Soccer.Server.Models;

namespace Soccer.Server.Services
{
    public interface IAuthService
    {
        Task<User> Register(RegisterDto registerDto);
        Task<AuthResponseDto> Login(LoginDto loginDto);
    }
}
