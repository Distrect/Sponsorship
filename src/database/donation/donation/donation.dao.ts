import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import { Role } from 'src/database/user';
import { DonationHistoryParams } from 'src/modules/donationModule/childNeed/childNeed.dto';
import Donation from 'src/database/donation/donation/donation.entity';
import UserDao from 'src/database/user/user/user.dao';
import ChildNeedDao from 'src/database/donation/childNeed/childNeed.dao';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';
import ChildDao from 'src/database/user/child/child.dao';

@Injectable()
export default class DonationDao {
  @Injector(Donation) private donationRepository: Repository<Donation>;
  private userDao: UserDao;
  private childDao: ChildDao;
  private cildNeedDao: ChildNeedDao;

  private async saveDonationEntity(entity: Donation) {
    return await this.donationRepository.save(entity);
  }

  public async createDonation(userId: number, needId: number, cost: number) {
    let [user, childNeed] = await Promise.all([
      this.userDao.getUser({ userId }),
      this.cildNeedDao.getNeed({ needId }),
    ]);

    childNeed = childNeed as ChildNeed;

    const donationRecord = this.donationRepository.create({
      amount: cost,
      childNeed,
      user,
    });

    return await this.saveDonationEntity(donationRecord);
  }

  /* Patlayabilir*/
  public async getDonationHistory(
    userId: number,
    { dateRange }: DonationHistoryParams,
    page: number,
  ) {
    if (page < 0) throw new Error('Baba aman dikkat');

    const userParam = { userId };

    const user = await this.userDao.getUser(userParam);

    let donationHistory = this.donationRepository
      .createQueryBuilder('donation')
      .leftJoin('donation.user', 'user')
      .leftJoin('child_need.group', 'need_group')
      .leftJoinAndSelect('donation.childNeed', 'child_need')
      .leftJoinAndSelect('need_group.child', 'child')
      .where('user.userId = :userId', { userId: user.userId });

    if (dateRange) {
      donationHistory = donationHistory.andWhere(
        'donation.createdAt BETWEEN :start and :end',
        { start: dateRange[0], end: dateRange[1] },
      );
    }

    return await donationHistory.getMany();
  }
}
