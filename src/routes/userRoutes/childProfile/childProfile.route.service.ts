import { Injectable } from '@nestjs/common';
import { SponsorshipStatus } from 'src/database/sponsor';
import ChildNeedService from 'src/modules/donationModule/childNeed/childNeed.service';
import FixNeedService from 'src/modules/sponsorModule/fixNeed/fixNeed.service';
import SponsorshipService from 'src/modules/sponsorModule/sponsor/sponsorShip.service';
import ChildService from 'src/modules/userModule/childModule/child.service';
import { IUserCookie } from 'shared/types';

@Injectable()
export default class ChildProfileRouteService {
  constructor(
    private childService: ChildService,
    private childNeedService: ChildNeedService,
    private fixNeedService: FixNeedService,
    private sponsorshipService: SponsorshipService,
  ) {}

  public async sponsorToChild(user: IUserCookie, fixNeedId: number) {
    return await this.sponsorshipService.sponsorToChild(user.userId, fixNeedId);
  }
  s;

  public async getChildProfile(childId: number) {
    const child = await this.childService.getChild({ userId: childId });
    const needGroup = await this.childNeedService.getChildNeedsData(
      {} as IUserCookie,
      child.userId,
    );

    return { child, needGroup };
  }

  public async getFixNeeds(childId: number) {
    return await this.fixNeedService.getFixNeedsOfChild(childId);
  }
}
