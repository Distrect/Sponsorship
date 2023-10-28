import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Role } from 'src/database/user';
import { AuthService } from 'src/services/auth/auth.service';
import { IUserCookie } from 'src/shared/types';
import { AuthorizationError } from 'src/utils/error';
import _ from 'lodash';

interface ExtendedRequest extends Request {
  user?: IUserCookie;
}

@Injectable()
export default class CookieMiddleware implements NestMiddleware {
  constructor(private role: Role) {}

  private isEmpty(user: IUserCookie) {
    return _.some(user, (val) => !!val);
  }

  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const token = req.cookies[this.role + 'Authorization'];
    const refreshToken = req.cookies[this.role + 'Refresh'];

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
    next();
  }
}
