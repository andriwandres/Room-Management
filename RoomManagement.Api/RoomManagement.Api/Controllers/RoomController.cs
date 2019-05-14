using Microsoft.AspNetCore.Mvc;
using RoomManagement.Api.Database;

namespace RoomManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class RoomController : ControllerBase
    {
        private readonly RoomManagementContext _context;

        public RoomController(RoomManagementContext context)
        {
            _context = context;
        }


    }
}