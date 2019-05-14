using System.ComponentModel.DataAnnotations;

namespace RoomManagement.Api.Models.DTOs
{
    public class EventDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Organizer { get; set; }
    }
}
