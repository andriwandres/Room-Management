using System.ComponentModel.DataAnnotations;

namespace RoomManagement.Api.Models.Domain
{
    public class Event
    {
        [Key]
        public int EventId { get; set; }

        [Required]
        [StringLength(45)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Organizer { get; set; }
    }
}
