import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import { Role } from 'src/database/user';
import { DonationHistoryParams } from 'src/modules/donationModule/childNeed/childNeed.module.interface';
import Donation from 'src/database/donation/donation/donation.entity';
import UserDAO from 'src/database/user/user/user.DAO';
import ChildNeedDAO from 'src/database/donation/childNeed/childNeed.DAO';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';
import ChildDAO from 'src/database/user/child/child.DAO';

@Injectable()
export default class DonationDAO {
  @Injector(Donation) private donationRepository: Repository<Donation>;
  private userDAO: UserDAO;
  private childDAO: ChildDAO;
  private cildNeedDAO: ChildNeedDAO;

  private async saveDonationEntity(entity: Donation) {
    return await this.donationRepository.save(entity);
  }

  public async createDonation(userId: number, needId: number, cost: number) {
    let [user, childNeed] = await Promise.all([
      this.userDAO.getUser({ userId }),
      this.cildNeedDAO.getNeed({ needId }),
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

    const user = await this.userDAO.getUser(userParam);

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
