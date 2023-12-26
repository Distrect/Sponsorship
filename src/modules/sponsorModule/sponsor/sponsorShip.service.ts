import { Injectable } from '@nestjs/common';
import { AlreadyHave } from 'src/utils/error';
import FixNeedDAO from 'src/database/sponsor/fixNeed/fixNeed.DAO';
import SponsorshipDAO from 'src/database/sponsor/sponsorship/sponsorship.dao';
import UserDAO from 'src/database/user/user/user.DAO';

@Injectable()
export default class SponsorshipService {
  constructor(
    private sponsorshipDAO: SponsorshipDAO,
    private fixNeedDAO: FixNeedDAO,
    private userDAO: UserDAO,
  ) {}

  public async blockSponsorship(sponosrshipId: number) {
    return await this.sponsorshipDAO.blockSponsorship(sponosrshipId);
  }

  public async getSponsorship(sponsorshipId: number) {
    const sponsorship = await this.sponsorshipDAO.getSponsorship({
      sponsorshipId,
    });

    return sponsorship;
  }

  public async getSponsorableFixNeeds(childId: number, userId: number) {
    const availableFixNeeds = await this.fixNeedDAO.getAvailableFixNeeds(
      childId,
      userId,
    );

    return availableFixNeeds;
  }

  // public async getUserSponsorShips(user: 'User' | 'Child', userId: number) {
  //   if (user === 'Child')
  //     return await this.sponsorshipDAO.getChildSponsors(userId);

  //   return await this.sponsorshipDAO.getUserSponsors(userId);
  // }

  public async sponsorToChild(userId: number, fixNeedId: number) {
    const sponsorshipInstance = await this.fixNeedDAO.getFixNeed({ fixNeedId });

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

  public async getUserSponsoredChilds(userId: number) {
    return await this.sponsorshipDAO.getUserSponsoredChilds(userId);
  }
}

// public async paySponsorship(userId: number) {}
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
