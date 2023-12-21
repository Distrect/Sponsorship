import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import User from 'src/database/user/user/user.entity';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import ChildDAO from 'src/database/user/child/child.DAO';
import UserDAO from 'src/database/user/user/user.DAO';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';
// import Child from 'src/database/user/child/child.entity';

@Injectable()
export default class SponsorshipDAO {
  @Injector(Sponsorship) private sponsorshipRepository: Repository<Sponsorship>;
  private userDAO: UserDAO;
  private childDAO: ChildDAO;

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
