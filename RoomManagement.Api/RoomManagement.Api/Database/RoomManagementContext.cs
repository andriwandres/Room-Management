using Microsoft.EntityFrameworkCore;
using RoomManagement.Api.Models;

namespace RoomManagement.Api.Database
{
    public class RoomManagementContext : DbContext
    {
        public RoomManagementContext(DbContextOptions<RoomManagementContext> options) : base(options) { }

        public DbSet<Room> Rooms { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}
