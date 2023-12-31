import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export default class WebSocketAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Vay ababnın');
    const clientSocket = context.switchToWs().getClient();
    const cookies = clientSocket.handshake.headers.cookie;
    /*.split('; ')
      .reduce((acc, val) => {
        const [key, cookie] = val.split('=');
        acc[key] = cookie;
        return acc;
      }, {});*/

    console.log('Client Socket:', clientSocket);
    console.log('Cookies:', cookies);

    return true;
  }
}
