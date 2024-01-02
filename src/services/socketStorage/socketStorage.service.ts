import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Role } from 'src/database/user';
import { IUserCookie } from 'src/shared/types';
import { ServerError } from 'src/utils/error';

@Injectable()
export default class SocketStorageService {
  private socketMap = new Map<string, Socket>();

  constructor() {}

  private createKey(role: Role, userId: number) {
    if (!userId || !role) throw new ServerError();

    return role + '-' + userId;
  }

  public addSocket(user: IUserCookie, socket: Socket) {
    this.socketMap.set(this.createKey(user.role, user.userId), socket);
  }

  public getSocket(role: Role, userId: number) {
    const socket = this.socketMap.get(this.createKey(role, userId));

    if (!socket) return null;

    return socket;
  }
}
