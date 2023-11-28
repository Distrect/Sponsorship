import { Injectable } from '@nestjs/common';
import FixNeedDao from 'src/database/sponsor/dao/fixNeed/fixNeed.dao';
import SponsorshipDao from 'src/database/sponsor/dao/sponsorship/sponsorship.dao';
import ChildDao from 'src/database/user/child/child.dao';
import UserDao from 'src/database/user/user/user.dao';

@Injectable()
export default class SponsorshipService {
  private sponsorshipDao: SponsorshipDao;
  private userDao: UserDao;
  private childDao: ChildDao;
  private fixNeedDao: FixNeedDao;

  public async getUserSponsorShips(user: 'User' | 'Child', userId: number) {
    if (user === 'Child')
      return await this.sponsorshipDao.getChildSponsors(userId);

    return await this.sponsorshipDao.getUserSponsors(userId);
  }

  public async sponsorToChild(
    userId: number,
    childId: number,
    fixNeedId: number,
  ) {
    const [user, child, fixNeed] = await Promise.all([
      this.userDao.getUser({ userId }),
      this.childDao.getChild({ userId: childId }),
      this.fixNeedDao.getFixNeed({ fixNeedId }),
    ]);

    const sponsorship = await this.sponsorshipDao.createSponsorship(
      user,
      child,
      fixNeed,
    );

    console.log(sponsorship);

    // sponsorship.
  }
}
