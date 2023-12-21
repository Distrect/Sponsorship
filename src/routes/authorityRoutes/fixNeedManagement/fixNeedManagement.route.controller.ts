import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Role } from 'src/database/user';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import FixNeedManagementRouteService from 'src/routes/authorityRoutes/fixNeedManagement/fixNeedMangement.route.service';
import { IUserCookie } from 'src/shared/types';

@Controller('authority/fixNeedManagement')
export default class FixNeedManagementRouteController {
  constructor(
    private fixNeedManagementService: FixNeedManagementRouteService,
  ) {}

  @Get('getFixNeeds/:childId')
  public async GetFixNeedsOfChild(
    @Param('childId', ParseIntPipe) childId: number,
    @User(Role.Authority) authority: IUserCookie,
  ) {
    const fixNeeds = await this.fixNeedManagementService.getChildFixNeeds(
      childId,
      authority,
    );

    return {
      ok: true,
      message: 'Fix Needs Of Chid Successfully Retrieved',
      fixNeeds,
    };
  }
}
