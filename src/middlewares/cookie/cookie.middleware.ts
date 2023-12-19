import {
  NestMiddleware,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response, NextFunction, Request } from 'express';
import { Role } from 'src/database/user';
import { ExtendedRequest, IUserCookie } from 'src/shared/types';
import { AuthorizationError } from 'src/utils/error';
import _ from 'lodash';
import AuthService from 'src/services/jwt/jwt.service';

export class CookieInterceptor implements NestInterceptor {
  constructor(private role: Role) {}

  private isEmpty(user: IUserCookie) {
    return !Object.values(user).every((val) => !!val);
  }

  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest() as ExtendedRequest;
    const res = context.switchToHttp().getResponse() as Response;

    const token = req.cookies[this.role + 'Authorization'];
    const refreshToken = req.cookies[this.role + 'Refresh'];

    console.log(`Token:${token},refreshToken:${refreshToken}`);

    if (!token && !refreshToken) throw new AuthorizationError();

    const refreshData = AuthService.deTokenizData<IUserCookie>(refreshToken);
    let userData = AuthService.deTokenizData<IUserCookie>(token);

    if (!refreshData && !userData) throw new AuthorizationError();

    if (!userData || !refreshData) {
      const tokenType = !userData ? 'Authorization' : 'Refresh';
      const data = !userData
        ? AuthService.deTokenizData<IUserCookie>(refreshToken)
        : userData;

      if (!data) throw new AuthorizationError();

      res.cookie(this.role + tokenType, data);
      userData = data;
    }

    if (this.isEmpty(userData)) throw new AuthorizationError();

    req.user = userData;
    return next.handle();
  }
}

export function CookieMiddlewareMixin(role: Role) {
  @Injectable()
  class CookieMiddleware implements NestMiddleware {
    constructor() {}

    isEmpty(user: IUserCookie) {
      return !Object.values(user).every((val) => !!val);
    }

    use(req: ExtendedRequest, res: Response, next: NextFunction) {
      console.log('MİDDLEWARE WORKS');
      const token = req.cookies[role + 'Authorization'];
      const refreshToken = req.cookies[role + 'Refresh'];

      if (!token && !refreshToken) throw new AuthorizationError();

      console.log('2 --------------------------------------------------');
      const refreshData = AuthService.deTokenizData<IUserCookie>(refreshToken);
      let userData = AuthService.deTokenizData<IUserCookie>(token);

      console.log('3 --------------------------------------------------');
      if (!refreshData && !userData) throw new AuthorizationError();

      console.log('4 --------------------------------------------------');
      if (!userData || !refreshData) {
        const tokenType = !userData ? 'Authorization' : 'Refresh';
        const data = !userData
          ? AuthService.deTokenizData<IUserCookie>(refreshToken)
          : userData;

        console.log('5 --------------------------------------------------');
        if (!data) throw new AuthorizationError();

        res.cookie(role + tokenType, data);
        userData = data;
      }

      console.log('6 --------------------------------------------------');
      if (this.isEmpty(userData)) throw new AuthorizationError();

      req.user = userData;
      next();
    }
  }
  return mixin(CookieMiddleware);
}
