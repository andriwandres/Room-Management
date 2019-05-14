using AutoMapper;
using RoomManagement.Api.Models.Domain;
using RoomManagement.Api.Models.DTOs;

namespace RoomManagement.Api.Configuration
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Event, EventDto>().ReverseMap();
            CreateMap<Room, RoomDto>().ReverseMap();
            CreateMap<Reservation, ReservationDto>().ReverseMap();
        }
    }
}
