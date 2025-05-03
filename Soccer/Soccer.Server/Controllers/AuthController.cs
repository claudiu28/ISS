using Microsoft.AspNetCore.Mvc;
using Soccer.Server.Dto;
using Soccer.Server.Services;

namespace Soccer.Server.Controllers
{

    [ApiController]
    [Route("api/auth")]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        private readonly IAuthService _authService = authService;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = await _authService.Register(registerDto);
            return Ok(new { user.Id, user.Username, user.CreateAt });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var response = await _authService.Login(loginDto);
            return Ok(response);
        }
    }
}