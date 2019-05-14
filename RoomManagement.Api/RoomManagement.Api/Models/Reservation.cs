using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoomManagement.Api.Models
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }

        public int EventId { get; set; }

        public int RoomId { get; set; }

        [Required]
        public DateTime Start { get; set; }

        [Required]
        public DateTime End { get; set; }


        [ForeignKey(nameof(EventId))]
        public Event Event { get; set; }

        [ForeignKey(nameof(RoomId))]
        public Room Room { get; set; }
    }
}
