using Microsoft.AspNetCore.Mvc;
using RoomManagement.Api.Database;

namespace RoomManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class EventController : ControllerBase
    {
        private readonly RoomManagementContext _context;

        public EventController(RoomManagementContext context)
        {
            _context = context;
        }
    }
}