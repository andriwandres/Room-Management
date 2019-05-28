import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

export enum GatewayEvents {
  CREATE_ROOM = 'create_room',
  CREATE_EVENT = 'create_event',
  CREATE_RESERVATION = 'create_reservation',

  UPDATE_ROOM = 'update_room',
  UPDATE_EVENT = 'update_event',
  UPDATE_RESERVATION = 'update_reservation',

  DELETE_ROOM = 'delete_room',
  DELETE_EVENT = 'delete_event',
  DELETE_RESERVATION = 'delete_reservation'
}

@WebSocketGateway(4001)
export class AppGateway {
  @WebSocketServer() server: Server;
}
