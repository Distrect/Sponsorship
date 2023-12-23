import { Controller, Get, Param } from '@nestjs/common';
import UserManagementRouteService from 'src/routes/authorityRoutes/userManagement/userManagement.route.service';

@Controller('authority/userManagement')
export default class UserManagementRouteController {
  constructor(private userManagementRouteService: UserManagementRouteService) {}

  @Get('getUserSponosrships/:userId')
  public async GetUserSponosredChilds(@Param('userId') userId: number) {
    const userSponosrships =
      await this.userManagementRouteService.getUserSponosredChilds(userId);

    return { ok: true, message: '', userSponosrships };
  }
}
