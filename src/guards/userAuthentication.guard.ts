import { Role } from './../database/user/index';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthorizationError } from 'src/utils/error';

@Injectable()
export class RoleGuard implements CanActivate {
  private role: Role;

  constructor(role: Role) {
    this.role = role;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const cookies = request.cookies();
    const authCookie = cookies[Role[this.role + 'Authorization']];

    if (!authCookie) throw new AuthorizationError();
    if (authCookie.type !== this.role) return false;

    return true;
  }
}
