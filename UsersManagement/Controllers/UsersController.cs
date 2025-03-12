using Microsoft.AspNetCore.Mvc;

namespace UsersManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {

        private readonly HttpClient _httpClient;

        public UsersController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var response = await _httpClient.GetAsync("https://jsonplaceholder.typicode.com/users");
            if (response.IsSuccessStatusCode)
            {
                var users = await response.Content.ReadAsStringAsync();
                return Ok(users);
            }
            return StatusCode((int)response.StatusCode);
        }

    }
}
