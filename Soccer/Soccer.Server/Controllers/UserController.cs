
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Soccer.Server.Dto;
using Soccer.Server.Services;
using System.Security.Claims;

namespace Soccer.Server.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> UserProfile()
        {
            var userId = long.Parse(User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
            var user = await _userService.GetById(userId);
            return user == null ? NotFound() : Ok(user);
        }

        [HttpGet("all-users")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAll();
            return Ok(users);
        }

        [HttpPut ("update-profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto Udto)
        {
            var userId = long.Parse(User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
            var user = await _userService.GetById(userId);
            if (user == null)
            {
                return NotFound();
            }
            user.FirstName = Udto.FirstName;
            user.LastName = Udto.LastName;
            await _userService.Update(user);
            return Ok(user);
        }

        [HttpPut("upload-picture")]
        [Authorize]
        public async Task <IActionResult> LoadProfilePicture([FromBody] UploadImageDto imageDto)
        {
            var userId = long.Parse(User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
            var user = await _userService.GetById(userId);
            if (user == null)
            {
                return NotFound();
            }
            user.ProfileImage = imageDto.Image;
            await _userService.Update(user);
            return Ok(user);
        }

        [HttpPut("remove-picture")]
        [Authorize]
        public async Task<IActionResult> RemoveProfilePicture()
        {
            var userId = long.Parse(User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
            var user = await _userService.GetById(userId);  
            if(user == null)
            {
                return NotFound();
            }
            user.ProfileImage = "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1742582408~exp=1742586008~hmac=0bf2fb65f0cc0df4a0b903c1832dbf8fd63160e829d6488536e3a4866d2302cf&w=1060";
            await _userService.Update(user);
            return Ok(user);
        }

        [HttpPost("{id}/add-role-to-user")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddUserRole([FromRoute]long id, [FromBody] string role)
        {
            await _userService.AddUserRole(id, role);
            var user = await _userService.GetById(id);
            if (user == null) {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("{id}/remove-role-to-user")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RemoveUserRole([FromRoute] long id, [FromBody] string role)
        {
            await _userService.RemoveUserRole(id, role);
            var user = await _userService.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        [HttpDelete("{id}/delete-user")]
        [Authorize(Roles = "Admin")]
        public async Task <IActionResult> DeleteUser([FromRoute] long id)
        {
            await _userService.Delete(id);
            return Ok("Delete user successful");
        }

        [HttpGet("roles")]
        [Authorize]
        public async Task<IActionResult> GetMyRoles()
        {
            var userId = long.Parse(User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
            var roles = await _userService.GetUserRoles(userId);
            return Ok(roles);
        }

        [HttpGet ("users-by-id")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserById([FromQuery] long id)
        {
            var user = await _userService.GetById(id);
            return user == null ? NotFound() : Ok(user);
        }

        [HttpGet("users-by-username")]
        [Authorize]
        public async Task<IActionResult> GetUserByUsername([FromQuery] string username)
        {
            var user = await _userService.GetByUsername(username);
            return user == null ? NotFound() : Ok(user);
        }

        [HttpGet("users-by-firstname")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserByFirstName([FromQuery] string firstName)
        {
            var users = await _userService.GetByFirstName(firstName);
            return users == null ? NotFound() : Ok(users);
        }

        [HttpGet("users-by-lastname")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserByLastName([FromQuery] string lastName)
        {
            var users = await _userService.GetByLastName(lastName);
            return users == null ? NotFound() : Ok(users);
        }

    }
}