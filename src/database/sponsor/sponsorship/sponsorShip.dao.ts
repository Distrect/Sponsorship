import { Injectable } from '@nestjs/common';
import { Repository, ReturnDocument } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import ChildDAO from 'src/database/user/child/child.DAO';
import UserDAO from 'src/database/user/user/user.DAO';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorship.entity';
import { FindSponsorship } from 'src/database/sponsor/sponsorship/sponosrship.interface';
import { NotFound, UserNotFoundError } from 'src/utils/error';
import { SponsorshipStatus } from 'src/database/sponsor';

@Injectable()
export default class SponsorshipDAO {
  constructor(
    @Injector(Sponsorship)
    private sponsorshipRepository: Repository<Sponsorship>,
    private userDAO: UserDAO,
    private childDAO: ChildDAO,
  ) {}

  private checkEntity(entity: Sponsorship) {
    if (!entity) {
      throw new NotFound('Sponosrship Not Found');
    }
  }

  private async saveSponsorshipEntity(entity: Sponsorship) {
    return await this.sponsorshipRepository.save(entity);
  }

  public async getUserSponsoredChilds(userId: number) {
    const userPromise = this.userDAO.getUser({ userId });

    const sponsoredChildsPromise =
      this.childDAO.getChildsOfSponosredUser(userId);

    const result = await Promise.all([
      userPromise,
      sponsoredChildsPromise,
    ]).then(([user, sponsoredChilds]) => ({
      user,
      sponsoredChilds,
    }));

    return result;
  }

  public async blockSponsorship(sponsorshipId: number) {
    const sponsorship = await this.getSponsorship({ sponsorshipId });

    sponsorship.status = SponsorshipStatus.BLOCKED;

    return await this.saveSponsorshipEntity(sponsorship);
  }

  public async getSponsorship(sponsorshipParams: FindSponsorship) {
    const sponsorship = await this.sponsorshipRepository.findOne({
      where: { ...sponsorshipParams },
      relations: { user: true, fixNeed: { child: true } },
    });

    this.checkEntity(sponsorship);

    return sponsorship;
  }

  public async isSponsorToNeed(fixNeedId: number) {
    const sponsorship = await this.sponsorshipRepository.findOne({
      where: { fixNeed: { fixNeedId } },
    });

    return !!sponsorship;
  }

  public async createSponsorship(userId: number, fixNeedId: number) {
    const sponsorShipInstance = this.sponsorshipRepository.create({
      user: { userId },
      fixNeed: { fixNeedId },
    });

    return await this.saveSponsorshipEntity(sponsorShipInstance);
  }

  public async checkIfUserSponsorToChild(userId: number, childId: number) {
    const [user, child] = await Promise.all([
      this.userDAO.getUser({ userId }),
      this.childDAO.getChild({ userId: childId }),
    ]);

    const sponosrship = await this.sponsorshipRepository
      .createQueryBuilder('sponsorship')
      .leftJoinAndSelect('sponsorship.fixNeed', 'fix_need')
      .leftJoinAndSelect('fix_need.child', 'child')
      .where(
        'sponsorship.user = :userId AND fix_need.child = :childId AND sponsorship.status = :status',
        {
          childId: child.userId,
          userId: user.userId,
          status: SponsorshipStatus.APPROVED,
        },
      )
      .getMany();

    if (!sponosrship) throw new NotFound();

    return sponosrship;
  }
}

// public async getChildSponsors(childId: number) {
//   return await this.sponsorshipRepository
//     .createQueryBuilder('sponsor_ship')
//     .leftJoinAndSelect('sponsor_ship.child', 'child')
//     .leftJoinAndSelect('sponsor_ship.user', 'user')
//     .where('child.userId = :childId', { childId })
//     .getMany();
// }

// public async getUserSponsors(userId: number) {
//   return await this.sponsorshipRepository
//     .createQueryBuilder('sponsor_ship')
//     .leftJoinAndSelect('sponsor_ship.child', 'child')
//     .leftJoinAndSelect('sponsor_ship.user', 'user')
//     .where('user.userId = :userId', { userId })
//     .getMany();
// }
