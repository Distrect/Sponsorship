import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/database/user';

export const User = createParamDecorator(
  (role: Role, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
