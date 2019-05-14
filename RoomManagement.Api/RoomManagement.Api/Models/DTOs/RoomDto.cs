using System.ComponentModel.DataAnnotations;

namespace RoomManagement.Api.Models.DTOs
{
    public class RoomDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
