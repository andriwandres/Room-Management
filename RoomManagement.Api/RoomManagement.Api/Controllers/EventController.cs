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
    public class EventController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly RoomManagementContext _context;

        public EventController(RoomManagementContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        [Route("getEvents")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Event>> GetEvents()
        {
            IEnumerable<Event> events = _context.Events;

            return Ok(events);
        }

        [HttpGet]
        [Route("getEvent/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Event>> GetEventById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Event @event = await _context.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            return Ok(@event);
        }

        [HttpPost]
        [Route("createEvent")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Event>> CreateEvent([FromBody] EventDto eventDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Event @event = _mapper.Map<Event>(eventDto);
            
            await _context.Events.AddAsync(@event);
            await _context.SaveChangesAsync();

            return Created(nameof(CreateEvent), @event);
        }

        [HttpPut]
        [Route("updateEvent/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Event>> UpdateEvent([FromRoute] int id, [FromBody] EventDto eventDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Event @event = await _context.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            @event.Title = eventDto.Title;
            @event.Description = eventDto.Description;
            @event.Organizer = eventDto.Organizer;

            _context.Events.Update(@event);
            await _context.SaveChangesAsync();

            return Ok(@event);
        }

        [HttpPatch]
        [Route("patchEvent/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Event>> PatchEvent([FromRoute] int id, [FromBody] JsonPatchDocument<EventDto> patchDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Event @event = await _context.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            EventDto eventDto = _mapper.Map<EventDto>(@event);

            patchDocument.ApplyTo(eventDto, ModelState);

            TryValidateModel(@event);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _mapper.Map(eventDto, @event);

            await _context.SaveChangesAsync();

            return Ok(@event);
        }

        [HttpDelete]
        [Route("deleteEvent/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteEvent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Event @event = await _context.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
