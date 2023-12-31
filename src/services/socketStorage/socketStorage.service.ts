import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { IUserCookie } from 'src/shared/types';

@Injectable()
export default class SocketStorageService {
  private socketMap = new Map<string, Socket>();

  constructor() {}

  public addSocket(user: IUserCookie, socket: Socket) {
    this.socketMap.set(user.userId + '', socket);
  }

  public getSocket(userId: number) {
    const socket = this.socketMap.get(userId + '');

    if (!socket) return;

    return socket;
  }
}
