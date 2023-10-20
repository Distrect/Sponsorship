import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Role } from 'src/database/user';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthorizationError } from 'src/utils/error';

interface ExtendedRequest extends Request {
  user?: any;
}

@Injectable()
export default class CookieMiddleware implements NestMiddleware {
  constructor(private role: Role) {}

  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const token = req.cookies[this.role + 'Authorization'];
    const refreshToken = req.cookies[this.role + 'Refresh'];

    if (!token && !refreshToken) throw new AuthorizationError();

    const refreshData = AuthService.deTokenizData(refreshToken);
    let userData = AuthService.deTokenizData(token);

    if (!refreshData && !userData) throw new AuthorizationError();

    if (!userData || !refreshData) {
      const tokenType = !userData ? 'Authorization' : 'Refresh';
      const data = !userData
        ? AuthService.deTokenizData(refreshToken)
        : userData;

      if (!data) throw new AuthorizationError();

      res.cookie(this.role + tokenType, data);
      userData = data;
    }

    req.user = userData;
    next();
  }
}
