import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { Role } from 'src/database/user';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthorizationError } from 'src/utils/error';

@Injectable()
export default class CookieMiddleware implements NestMiddleware {
  constructor(private role: Role) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies[this.role + 'Authorization'];
    const refreshToken = req.cookies[this.role + 'Refresh'];

    if (!token && !refreshToken) throw new AuthorizationError();

    const userData = AuthService.deTokenizData(token);

    if (!userData) {
      const refreshData = AuthService.deTokenizData(refreshToken);

      if (!refreshData) throw new AuthorizationError();

      const newToken = AuthService.tokenizeData(refreshData);
      res.cookie(this.role + 'Authorization', newToken);
    }
  }
}
