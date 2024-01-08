import { Injectable } from '@nestjs/common';
import { Repository, ReturnDocument } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import ChildDAO from 'src/database/user/child/child.DAO';
import UserDAO from 'src/database/user/user/user.DAO';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorship.entity';
import { FindSponsorship } from 'src/database/sponsor/sponsorship/sponosrship.interface';
import { NotFound, NotSponsoredError } from 'src/utils/error';
import { SponsorshipStatus } from 'src/database/sponsor';
import BaseUser from 'src/database/user/baseUser';
import { Role } from 'src/database/user';
import { Server } from 'mysql2/typings/mysql/lib/Server';

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

  public async getUserChildSponsorship(
    userId: number,
    childId: number,
    sponsorshipId?: number,
  ) {
    const [user, child] = await Promise.all([
      this.userDAO.getUser({ userId }),
      this.childDAO.getChild({ userId: childId }),
    ]);

    const sponsorship = await this.sponsorshipRepository
      .createQueryBuilder('sponsorship')
      .leftJoinAndSelect('sponsorship.fixNeed', 'fix_need')
      .leftJoinAndSelect('fix_need.child', 'child')
      .leftJoinAndSelect('sponsorship.user', 'user')
      .where(
        'user.userId = :userId AND child.userId = :childId AND sponsorship.status = :status',
        {
          childId: child.userId,
          userId: user.userId,
          status: SponsorshipStatus.APPROVED,
        },
      )
      .getOne();

    if (!sponsorship) throw new NotSponsoredError();

    return { child, user, sponsorship };
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

  public async checkIfSponosrshipActive(sponsorshipId: number) {
    const sponosrship = await this.getSponsorship({ sponsorshipId });

    return sponosrship.status !== SponsorshipStatus.APPROVED;
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
      .leftJoinAndSelect('sponsorship.user', 'user')
      .where(
        'user.userId = :userId AND child.userId = :childId AND sponsorship.status = :status',
        {
          childId: child.userId,
          userId: user.userId,
          status: SponsorshipStatus.APPROVED,
        },
      )
      .getOne();

    if (!sponosrship) return false;

    return !!sponosrship;
  }

  public async getActorMessages(user: BaseUser) {
    const whereAlias =
      user.role === Role.User
        ? `user.userId = :userId`
        : user.role === Role.Child
        ? 'child.userId = :userId'
        : null;

    if (!whereAlias) throw new Error('User Role is Not accepted');

    const den = this.sponsorshipRepository
      .createQueryBuilder('sponsorship')
      .innerJoinAndSelect('sponsorship.messages', 'message')
      .innerJoinAndSelect('sponsorship.fixNeed', 'fix_need')
      .innerJoinAndSelect('sponsorship.user', 'user')
      .innerJoinAndSelect('fix_need.child', 'child')
      .orderBy('message.date', 'ASC')
      .where(whereAlias, { userId: user.userId });

    const result = await den.getMany();

    console.log('Messages:', result[0].messages);

    return result;
  }

  /*public async getActorMessages({ userId, role }: BaseUser) {
    if (![Role.User, Role.Child].includes(role)) throw new ServerError('Baba');

    const selectAlias =
      role === 'Child' ? 'sponsorship.fixNeed.child' : 'sponsorship.user';

    const whereAlias = `${role.toLowerCase()}.userId = :userId`;

    const userMessagesSponosrship = await this.sponsorshipRepository
      .createQueryBuilder('sponsorship')
      .leftJoinAndSelect('sponsorship.user', 'user')
      .leftJoinAndSelect('sponsorship.fixNeed', 'fix_need')
      .leftJoinAndSelect('sponsorship.messages', 'message')
      .leftJoinAndSelect('fix_need.child', 'child')
      // .select([selectAlias, 'sponsorship.*'])
      .where(whereAlias, { userId })
      // .orderBy('message.createdAt', 'DESC')
      .getMany();

    console.log('User Message Sponsorship:', userMessagesSponosrship);

    return userMessagesSponosrship;
  }*/
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

// const childRepo = this.childDAO.childRepository.createQueryBuilder('child');
// const userRepo = this.userDAO.userRepository.createQueryBuilder('user');

// const useQueryBuilder = user.role === 'Child' ? userRepo : childRepo;

// const entityAlias = user.role === 'Child' ? 'child' : 'user';

// const queryBuilder = useQueryBuilder
//   .leftJoinAndSelect(`${entityAlias}.sponsorship`, 'sponsorship')
//   .leftJoinAndSelect('sponsorship.fixNeed', 'fix_need')
//   .leftJoinAndSelect('sponsorship.messages', 'message');

// if (user.role === Role.User) {
//   queryBuilder
//     .leftJoinAndSelect('sponsorship.user', 'user')
//     .where('user.userId = :userId', { userId: user.userId });
// } else if (user.role === Role.Child) {
//   queryBuilder
//     .leftJoinAndSelect('fix_need.child', 'child')
//     .where('child.userId = :userId', { userId: user.userId });
// } else {
//   throw new Error('Dayiii');
// }

// console.log('Messages:', await queryBuilder.getMany());

// /*

// const actor = await useQueryBuilder.where("user.userId = :userId",{userId:user.userId}).getOne();
// const x = childRepo.leftJoinAndSelect("child.fixNeeds","fix_ned").leftJoinAndSelect("fix_need.sponpo")*/
// return [] as unknown as Promise<ActorMessage[]>;

/* const childRepo = this.childDAO.childRepository.createQueryBuilder('child');
    const userRepo = this.userDAO.userRepository.createQueryBuilder('user');
*/
/*    const userMessages = userRepo
      .leftJoinAndSelect('user.sponsor', 'sponsorship')
      .leftJoinAndSelect('sponsorship.messages', 'message')
      .leftJoinAndSelect('sponsorship.fixNeed', 'fix_need')
      .leftJoinAndSelect('fix_need.child', 'child')
      .where('user.userId = :userId', { userId: user.userId });

    const childMessages = childRepo
      .innerJoinAndSelect('child.fixNeeds', 'fix_need')
      .innerJoinAndSelect('fix_need.sponsorship', 'sponsorship')
      .innerJoinAndSelect('sponsorship.messages', 'message')
      .innerJoinAndSelect('sponsorship.user', 'user')
      .where('user.userId = :userId', { userId: user.userId })
      .orderBy('message.date', 'ASC');
*/
