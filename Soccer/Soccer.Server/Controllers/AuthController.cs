using Microsoft.AspNetCore.Mvc;
using Soccer.Server.Dto;
using Soccer.Server.Services;
using Sprache;

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
            try
            {
                var user = await _authService.Register(registerDto);
                return Ok(new { user.Id, user.Username, user.CreateAt });
            }
            catch
            {
                return BadRequest(new { message = "An error occurred during registration" });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var response = await _authService.Login(loginDto);
                return Ok(response);
            }
            catch
            {            {
                return BadRequest(new { message = "An error occurred during login" });
            }
        }
        }
    }
}