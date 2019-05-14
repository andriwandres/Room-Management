using System.ComponentModel.DataAnnotations;

namespace RoomManagement.Api.Models.Domain
{
    public class Room
    {
        [Key]
        public int RoomId { get; set; }

        [Required]
        [StringLength(45)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
