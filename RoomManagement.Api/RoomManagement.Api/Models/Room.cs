using System.ComponentModel.DataAnnotations;

namespace RoomManagement.Api.Models
{
    public class Room
    {
        [Key]
        public int RoomId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
