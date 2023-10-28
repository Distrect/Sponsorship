import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/database/user';
import { IUserCookie } from 'src/shared/types';
import { AuthorizationError, ServerError } from 'src/utils/error';

export const User = createParamDecorator(
  (role: Role, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    if (!user.role) throw new ServerError('Cookie is problemtaic');

    if (user.role !== role) throw new AuthorizationError();

    return user as IUserCookie;
  },
);
