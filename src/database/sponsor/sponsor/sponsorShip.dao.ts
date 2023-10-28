import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import SponsorShip from 'src/database/sponsor/sponsor/sponsorShip.entity';
import User from 'src/database/user/user.entity';
import Identification from 'src/database/user/identification/identification.entity';

@Injectable()
export default class SponsorshipDao {
  @Injector(SponsorShip) private sponsorshipRepository: Repository<SponsorShip>;

  public async getChildSponsors(childId: number) {
    const sponsorsOfChild = await this.sponsorshipRepository
      .createQueryBuilder('sponsor_ship')
      .innerJoinAndSelect('sponsor_ship.child', 'child')
      .leftJoinAndMapMany(
        'sponsor_ship.user',
        (qb) => qb.select().from(User, 'user'),
        'user',
      );

    console.log(sponsorsOfChild.getQuery(), await sponsorsOfChild.getOne());
  }
}
