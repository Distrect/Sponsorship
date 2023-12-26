import { Injectable, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WebSocketAuthGuard } from 'src/guards/websoocket.auth.guard';
import BaseSocket from 'src/websocket/base.gateway';

import { Socket, Server } from 'socket.io';
import { Role } from 'src/database/user';

@Injectable()
@WebSocketGateway({
  cookie: true,
  transports: ['websocket', 'polling'],
  cors: {
    origins: ['http://localhost:5173/'],
  },
})
export default class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor() {
    console.log('BaseSocket');
  }

  public afterInit(server: Server) {
    console.log(' Socket has been created and ready to serve', server);
  }

  public async handleConnection(client: Socket) {
    const role = client.data.role as Role;
    console.log(client.handshake.headers);
    console.log('HandleConnection:', client.handshake.headers.cookie);
  }

  public async handleDisconnect(client: Socket) {}
}
