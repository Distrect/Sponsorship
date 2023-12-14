import { Injectable } from '@nestjs/common';
import { AlreadyHave } from 'src/utils/error';
import UserDao from 'src/database/user/user/user.dao';
import ChildDao from 'src/database/user/child/child.dao';
import FixNeedDao from 'src/database/sponsor/fixNeed/fixNeed.dao';
import SponsorshipDao from 'src/database/sponsor/sponsorship/sponsorShip.dao';

@Injectable()
export default class SponsorshipService {
  private sponsorshipDao: SponsorshipDao;
  private userDao: UserDao;
  private childDao: ChildDao;
  private fixNeedDao: FixNeedDao;

  public async getSponsorableFixNeeds(childId: number, userId: number) {
    const availableFixNeeds = await this.fixNeedDao.getAvailableFixNeeds(
      childId,
      userId,
    );

    return availableFixNeeds;
  }

  public async getUserSponsorShips(user: 'User' | 'Child', userId: number) {
    if (user === 'Child')
      return await this.sponsorshipDao.getChildSponsors(userId);

    return await this.sponsorshipDao.getUserSponsors(userId);
  }

  public async sponsorToChild(userId: number, fixNeedId: number) {
    const isFixNeedSponsored =
      await this.sponsorshipDao.isSponsorToNeed(fixNeedId);

    if (isFixNeedSponsored)
      throw new AlreadyHave('This Fix Need Already Sponsored');

    const sponsorship = await this.sponsorshipDao.createSponsorship(
      userId,
      fixNeedId,
    );

    return sponsorship;
  }

  // public async paySponsorship(userId: number) {}
}

/*
async function sponsorToChild(
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
}
*/
