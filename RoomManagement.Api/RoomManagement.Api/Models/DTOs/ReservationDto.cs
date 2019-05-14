using System;
using System.ComponentModel.DataAnnotations;

namespace RoomManagement.Api.Models.DTOs
{
    public class ReservationDto
    {
        [Required]
        public int EventId { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public DateTime Start { get; set; }

        [Required]
        public DateTime End { get; set; }
    }
}
