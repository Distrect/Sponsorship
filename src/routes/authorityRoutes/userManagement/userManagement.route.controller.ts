import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Role } from 'src/database/user';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import UserManagementRouteService from 'src/routes/authorityRoutes/userManagement/userManagement.route.service';
import { IUserCookie } from 'src/shared/types';

@Controller('authority/userManagement')
export default class UserManagementRouteController {
  constructor(private userManagementRouteService: UserManagementRouteService) {}

  @Get('getUserSponosrships/:userId')
  public async GetUserSponosredChilds(@Param('userId') userId: number) {
    const userSponosrships =
      await this.userManagementRouteService.getUserSponosredChilds(userId);

    return { ok: true, message: '', userSponosrships };
  }

  @Get('getUser/:userId')
  public async GetUser(
    @Param('userId', ParseIntPipe) userId: number,
    @User(Role.Authority) authority: IUserCookie,
  ) {
    const user = await this.userManagementRouteService.getUser(
      authority,
      userId,
    );
  }

  public async DeleteUser() {}
}
