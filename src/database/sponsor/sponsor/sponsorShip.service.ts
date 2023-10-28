import { Injectable, Inject } from '@nestjs/common';
import SponsorshipDao from 'src/database/sponsor/sponsor/sponsorShip.dao';

@Injectable()
export default class SponsorshipService {
  @Inject() private sposnorShipDao: SponsorshipDao;

  public async getUserSponsorShips() {
    return await this.sposnorShipDao.getChildSponsors(1);
  }
}
