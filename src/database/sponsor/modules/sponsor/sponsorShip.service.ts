import { Injectable, Inject } from '@nestjs/common';
import SponsorshipDao from 'src/database/sponsor/dao/sponsorship/sponsorShip.dao';

@Injectable()
export default class SponsorshipService {
  @Inject() private sposnorShipDao: SponsorshipDao;

  public async getUserSponsorShips(user: 'User' | 'Child', userId: number) {
    if (user === 'Child')
      return await this.sposnorShipDao.getChildSponsors(userId);

    return await this.sposnorShipDao.getUserSponsors(userId);
  }

  public async blockSponsorShip(sponsorShipId: number) {}
}
