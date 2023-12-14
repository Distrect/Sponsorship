import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import User from 'src/database/user/user/user.entity';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import ChildDao from 'src/database/user/child/child.dao';
import UserDao from 'src/database/user/user/user.dao';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';
// import Child from 'src/database/user/child/child.entity';

@Injectable()
export default class SponsorshipDao {
  @Injector(Sponsorship) private sponsorshipRepository: Repository<Sponsorship>;
  private userDao: UserDao;
  private childDao: ChildDao;

  public async isSponsorToNeed(fixNeedId: number) {
    const sponsorship = await this.sponsorshipRepository.findOne({
      where: { fixNeed: { fixNeedId } },
    });

    return !!sponsorship;
  }

  private async saveSponsorshipEntity(entity: Sponsorship) {
    return await this.sponsorshipRepository.save(entity);
  }

  public async createSponsorship(userId: number, fixNeedId: number) {
    const sponsorShipInstance = this.sponsorshipRepository.create({
      user: { userId },
      fixNeed: { fixNeedId },
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
