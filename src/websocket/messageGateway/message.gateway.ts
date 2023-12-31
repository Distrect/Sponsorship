import { Injectable, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Role } from 'src/database/user';
import { IUserCookie } from 'src/shared/types';
import { MessageDTO } from 'src/websocket/messageGateway/message.gateway.interface';
import SocketStorageService from 'src/services/socketStorage/socketStorage.service';
import WebSocketAuthGuard from 'src/guards/websoocket.auth.guard';
import JwtService from 'src/services/jwt/jwt.service';
import MessageService from 'src/modules/sponsorModule/messageModule/message.service';
import { ServerError } from 'src/utils/error';

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
  constructor(
    private messageService: MessageService,
    private socketStorgeSerice: SocketStorageService,
  ) {}

  private errorHandler(error: any) {
    const { message, stack, name } = error;

    return { ok: false, message, stack, name };
  }

  private formatCookies(parsedCookie: string, role: Role) {
    if (!parsedCookie) throw new Error('1');

    const cookies = parsedCookie.split('; ');

    const token = cookies
      .find((cookie) => cookie.includes(role + 'Authorization'))
      .trim()
      .split('=')[1];

    console.log('Role', role, token);

    const refreshToken = cookies
      .find((cookie) => cookie.includes(role + 'Refresh'))
      .trim()
      .split('=')[1];

    if (!token || !refreshToken) {
      throw new Error('Bir Olay Vr');
    }

    const actorCredentials = JwtService.getUserCookieFromTokens<IUserCookie>(
      token,
      refreshToken,
    );

    return actorCredentials;
  }

  private errorEmitter(client: Socket, error: Error) {
    console.log('Error:', error);

    client.emit('error', { ok: false, error });
  }

  public afterInit(server: Server) {
    console.log(' Socket has been created and ready to serve', server);
  }

  public async handleConnection(client: Socket) {
    try {
      const query = Object.assign({}, client.handshake.query);
      const role = query.role as Role;
      const cookieString = client.handshake.headers.cookie;
      const cookies = cookieString.split('; ');

      if (!cookieString || !cookies || cookies.length < 1)
        throw new ServerError();

      console.log('Query:', query);
      console.log('Role:', role);
      console.log('CookieString:', cookieString);
      console.log('Cookies:', cookies);

      // const [token,refresToken] = cookies.reduce((acc,val) => ,[])

      const token = cookies
        .find((cookie) => cookie.includes(role + 'Authorization'))
        .trim()
        .split('=')[1];

      const refreshToken = cookies
        .find((cookie) => cookie.includes(role + 'Refresh'))
        .trim()
        .split('=')[1];

      if (!Object.values(Role).includes(role) && (!token || !refreshToken))
        return client.disconnect(true);

      const actorCredential = JwtService.deTokenizData<IUserCookie>(
        token || refreshToken,
      );

      if (!actorCredential) return client.disconnect(true);
      console.log('Credetial', actorCredential);

      this.socketStorgeSerice.addSocket(actorCredential, client);

      return client;
    } catch (error) {
      this.errorEmitter(client, error);
    }
  }

  @SubscribeMessage('message')
  private async sendMessage(
    @MessageBody() data: MessageDTO,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = this.formatCookies(
        client.handshake.headers.cookie,
        client.handshake.query.role as Role,
      );

      console.log('User:', user, 'Data:', data);

      const toUserSocket = this.socketStorgeSerice.getSocket(data.toUserId);

      console.log(
        'Is Spoonsr',
        await this.messageService.checkIfUserSponosrToChild(
          user.userId,
          data.toUserId,
        ),
      );
    } catch (error) {
      this.errorEmitter(client, error);
    }
  }

  public async handleDisconnect(client: Socket) {}
}
