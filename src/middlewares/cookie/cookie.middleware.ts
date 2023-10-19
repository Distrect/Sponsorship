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

    let userData = AuthService.deTokenizData(token);

    if (!userData) {
      const refreshData = AuthService.deTokenizData(refreshToken);

      if (!refreshData) throw new AuthorizationError();

      const newToken = AuthService.tokenizeData(refreshData);
      userData = refreshData;
      res.cookie(this.role + 'Authorization', newToken);
    }

    req.user = userData;
    next();
  }
}
