import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import SponsorShip from 'src/database/sponsor/sponsor/sponsorShip.entity';

@Injectable()
export default class SponsorshipDao {
  @Injector(SponsorShip) private sponsorshipRepository: Repository<SponsorShip>;

  public async getChildSponsors(childId: number) {
    return await this.sponsorshipRepository
      .createQueryBuilder('sponsor_ship')
      .leftJoinAndSelect('sponsor_ship.child', 'child')
      .leftJoinAndSelect('sponsor_ship.user', 'user')
      .where('child.userId = :childId', { childId })
      .getMany();
  }
  public async getUserSponsors(userId: number) {
    return await this.sponsorshipRepository
      .createQueryBuilder('sponsor_ship')
      .leftJoinAndSelect('sponsor_ship.child', 'child')
      .leftJoinAndSelect('sponsor_ship.user', 'user')
      .where('user.userId = :userId', { userId })
      .getMany();
  }
}
