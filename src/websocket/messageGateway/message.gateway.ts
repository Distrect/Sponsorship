import { Injectable } from '@nestjs/common';
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
import { ActorPoint } from 'src/websocket/messageGateway/message.gateway.interface';
import { AuthorizationError, ServerError } from 'src/utils/error';
import { MessageDTO } from 'src/shared/webSocket.types';
import SocketStorageService from 'src/services/socketStorage/socketStorage.service';
import JwtService from 'src/services/jwt/jwt.service';
import MessageService from 'src/modules/sponsorModule/messageModule/message.service';

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
  private readonly pointObject: ActorPoint = {
    User: 1,
    Authority: 2,
    Child: 3,
  };

  constructor(
    private messageService: MessageService,
    private socketStorgeSerice: SocketStorageService,
  ) {}

  private errorHandler(error: any) {
    const { message, stack, name } = error;

    return { ok: false, message, stack, name };
  }

  private checkScore(p1: number, p2: number) {
    if (p1 === p2) throw new AuthorizationError();

    return p1 + p2;
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

      if (!cookieString) throw new AuthorizationError();

      const cookies = cookieString.split('; ');

      if (!cookieString || !cookies || cookies.length < 1)
        throw new ServerError();

      console.log('Query:', query);
      console.log('Role:', role);
      console.log('CookieString:', cookieString);
      console.log('Cookies:', cookies);

      // const [token,refresToken] = cookies.reduce((acc,val) => ,[])

      const token = cookies
        .find((cookie) => cookie.trim().includes(role + 'Authorization'))
        ?.split('=')[1];

      const refreshToken = cookies
        .find((cookie) => cookie.trim().includes(role + 'Refresh'))
        ?.split('=')[1];

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
      return { ok: false, error };
    }
  }

  @SubscribeMessage('message')
  private async sendMessage(
    @MessageBody() { fromUser, toUser, sponsorshipId, message }: MessageDTO,
    @ConnectedSocket() fromUserSocket: Socket,
  ) {
    try {
      const user = this.formatCookies(
        fromUserSocket.handshake.headers.cookie,
        fromUserSocket.handshake.query.role as Role,
      );

      if (fromUser.userId !== user.userId) throw new AuthorizationError();

      const toUserSocket = this.socketStorgeSerice.getSocket(toUser.userId);

      console.log('To User Socket', toUserSocket);

      const score = this.checkScore(
        this.pointObject[user.role],
        this.pointObject[toUser.role],
      );

      let messageRecord;

      if (score === 4) {
        messageRecord = await this.messageService.message(
          user.userId,
          toUser.userId,
          message,
        );

        toUserSocket && toUserSocket.emit('receiveMessage', messageRecord);
      }
      return messageRecord;
    } catch (error) {
      console.log(error);
      this.errorEmitter(fromUserSocket, error);
    }
  }

  public async handleDisconnect(client: Socket) {}
}
