import { Injectable } from '@nestjs/common';
import { AlreadyHave } from 'src/utils/error';
import UserDAO from 'src/database/user/user/user.DAO';
import ChildDAO from 'src/database/user/child/child.DAO';
import FixNeedDAO from 'src/database/sponsor/fixNeed/fixNeed.DAO';
import SponsorshipDAO from 'src/database/sponsor/sponsorship/sponsorShip.DAO';

@Injectable()
export default class SponsorshipService {
  private sponsorshipDAO: SponsorshipDAO;
  private userDAO: UserDAO;
  private childDAO: ChildDAO;
  private fixNeedDAO: FixNeedDAO;

  public async getSponsorableFixNeeds(childId: number, userId: number) {
    const availableFixNeeds = await this.fixNeedDAO.getAvailableFixNeeds(
      childId,
      userId,
    );

    return availableFixNeeds;
  }

  public async getUserSponsorShips(user: 'User' | 'Child', userId: number) {
    if (user === 'Child')
      return await this.sponsorshipDAO.getChildSponsors(userId);

    return await this.sponsorshipDAO.getUserSponsors(userId);
  }

  public async sponsorToChild(userId: number, fixNeedId: number) {
    const isFixNeedSponsored =
      await this.sponsorshipDAO.isSponsorToNeed(fixNeedId);

    if (isFixNeedSponsored)
      throw new AlreadyHave('This Fix Need Already Sponsored');

    const sponsorship = await this.sponsorshipDAO.createSponsorship(
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
    this.userDAO.getUser({ userId }),
    this.childDAO.getChild({ userId: childId }),
    this.fixNeedDAO.getFixNeed({ fixNeedId }),
  ]);

  const sponsorship = await this.sponsorshipDAO.createSponsorship(
    user,
    child,
    fixNeed,
  );

  console.log(sponsorship);
}
*/
