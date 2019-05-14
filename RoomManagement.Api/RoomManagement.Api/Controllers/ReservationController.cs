using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using RoomManagement.Api.Database;
using RoomManagement.Api.Models.Domain;
using RoomManagement.Api.Models.DTOs;

namespace RoomManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ReservationController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly RoomManagementContext _context;

        public ReservationController(RoomManagementContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        [Route("getReservations")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Reservation>> GetReservations()
        {
            IEnumerable<Reservation> reservations = _context.Reservations;

            return Ok(reservations);
        }
        
        [HttpGet]
        [Route("getReservation/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Reservation>> GetReservationById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Reservation reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

        [HttpPost]
        [Route("createReservation")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Reservation>> CreateReservation([FromBody] ReservationDto reservationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Reservation reservation = _mapper.Map<Reservation>(reservationDto);

            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();

            return Created(nameof(CreateReservation), reservation);
        }

        [HttpPut]
        [Route("updateReservation/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Reservation>> UpdateReservationById([FromRoute] int id, [FromBody] ReservationDto reservationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Reservation reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            reservation.EventId = reservationDto.EventId;
            reservation.RoomId = reservationDto.RoomId;
            reservation.Start = reservationDto.Start;
            reservation.End = reservationDto.End;

            _context.Reservations.Update(reservation);
            await _context.SaveChangesAsync();

            return Ok(reservation);
        }

        [HttpPatch]
        [Route("patchReservation/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Reservation>> PatchReservationById([FromRoute] int id, [FromBody] JsonPatchDocument<ReservationDto> patchDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Reservation reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            ReservationDto reservationDto = _mapper.Map<ReservationDto>(reservation);

            patchDocument.ApplyTo(reservationDto, ModelState);

            if (TryValidateModel(reservation))
            {
                return BadRequest(ModelState);
            }

            _mapper.Map(reservationDto, reservation);

            await _context.SaveChangesAsync();

            return Ok(reservation);
        }

        [HttpDelete]
        [Route("deleteReservation/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteReservationById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Reservation reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
