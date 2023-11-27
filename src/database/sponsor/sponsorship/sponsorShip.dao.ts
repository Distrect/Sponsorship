import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import User from 'src/database/user/sponsor/user.entity';
import Child from 'src/database/user/child/child.entity';
import FixNeed from 'src/database/sponsor/dao/fixNeed/fixNeed.entity';
import Sponsorship from 'src/database/sponsor/dao/sponsorship/sponsorship.entity';

@Injectable()
export default class SponsorshipDao {
  @Injector(Sponsorship) private sponsorshipRepository: Repository<Sponsorship>;

  private async saveSponsorshipEntity(entity: Sponsorship) {
    return await this.sponsorshipRepository.save(entity);
  }

  public async createSponsorship(user: User, child: Child, fixNeed: FixNeed) {
    const sponsorShipInstance = this.sponsorshipRepository.create({
      child,
      user,
      fixNeed,
    });

    return await this.saveSponsorshipEntity(sponsorShipInstance);
  }

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
