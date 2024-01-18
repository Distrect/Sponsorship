import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Role } from 'src/database/user';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import { IUserCookie } from 'shared/types';
import ChildProfileRouteService from 'src/routes/userRoutes/childProfile/childProfile.route.service';

@Controller('user/childProfile')
export default class ChildProfileRouteController {
  constructor(private childProfileRouteService: ChildProfileRouteService) {}

  @Get('getChildPofile/:childId')
  public async GetChildProfile(
    @Param('childId', ParseIntPipe) childId: number,
  ) {
    const profile =
      await this.childProfileRouteService.getChildProfile(childId);

    return { ok: true, message: 'Child profile', data: profile };
  }

  @Get('getFixNeeds/:childId')
  public async GetChildSponsorableFixNeeds(
    @Param('childId', ParseIntPipe) childId: number,
  ) {
    const fixNeeds = await this.childProfileRouteService.getFixNeeds(childId);

    return { ok: true, message: 'f', data: fixNeeds };
  }

  @Get('sponsorToChild/:fixNeedId')
  public async SponsorToChild(
    @Param('fixNeedId') fixNeedId: number,
    @User(Role.User) user: IUserCookie,
  ) {
    const sponosorship = await this.childProfileRouteService.sponsorToChild(
      user,
      fixNeedId,
    );

    return { ok: true, message: 'w', data: sponosorship };
  }
}
