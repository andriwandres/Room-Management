using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using RoomManagement.Api.Database;
using RoomManagement.Api.Models.Domain;
using RoomManagement.Api.Models.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RoomManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class RoomController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly RoomManagementContext _context;

        public RoomController(RoomManagementContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        [Route("getRooms")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Room>> GetRooms()
        {
            IEnumerable<Room> rooms = _context.Rooms;

            return Ok(rooms);
        }

        [HttpGet]
        [Route("getRoom/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Room>> GetRoomById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Room room = await _context.Rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        [HttpPost]
        [Route("createRoom")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Room>> CreateRoom([FromBody] RoomDto roomDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Room room = _mapper.Map<Room>(roomDto);

            await _context.Rooms.AddAsync(room);
            await _context.SaveChangesAsync();

            return Created(nameof(CreateRoom), room);
        }

        [HttpPut]
        [Route("updateRoom/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Room>> UpdateRoomById([FromRoute] int id, [FromBody] RoomDto roomDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Room room = await _context.Rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            room.Name = roomDto.Name;
            room.Description = roomDto.Description;

            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();

            return Ok(room);
        }

        [HttpPatch]
        [Route("patchRoom/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Room>> PatchRoomById([FromRoute] int id, [FromBody] JsonPatchDocument<RoomDto> patchDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Room room = await _context.Rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            RoomDto roomDto = _mapper.Map<RoomDto>(room);

            patchDocument.ApplyTo(roomDto, ModelState);

            if (TryValidateModel(room))
            {
                return BadRequest(ModelState);
            }

            _mapper.Map(roomDto, room);

            await _context.SaveChangesAsync();

            return Ok(room);
        }

        [HttpDelete]
        [Route("deleteRoom/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteRoomById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Room room = await _context.Rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
