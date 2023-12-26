import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import { IDonateNeed } from 'src/database/donation/childNeed/childNeed.DAO.interface';
import { DonationHistoryParams } from 'src/modules/donationModule/childNeed/childNeed.module.interface';
import Donation from 'src/database/donation/donation/donation.entity';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';
import UserDAO from 'src/database/user/user/user.DAO';
import ChildDAO from 'src/database/user/child/child.DAO';
import ChildNeedDAO from 'src/database/donation/childNeed/childNeed.DAO';

@Injectable()
export default class DonationDAO {
  constructor(
    @Injector(Donation) private donationRepository: Repository<Donation>,
    private userDAO: UserDAO,
    private childDAO: ChildDAO,
    private childNeedDAO: ChildNeedDAO,
  ) {}

  private async saveDonationEntity(entity: Donation) {
    return await this.donationRepository.save(entity);
  }

  public async createDonation(donationParams: DeepPartial<Donation>) {
    const donationInstance = this.donationRepository.create({
      ...donationParams,
    });

    return await this.saveDonationEntity(donationInstance);
  }

  public async donateToNeed(userId: number, { amount, needId }: IDonateNeed) {
    const [user, childNeed] = await Promise.all([
      this.userDAO.getUser({ userId }),
      this.childNeedDAO.getNeed({ needId }) as Promise<ChildNeed>,
    ]);

    const childNeedPrice = childNeed.amount * childNeed.price;
    const left = childNeedPrice - childNeed.totals;

    if (amount > left) throw new Error('Dayı olmaz');

    const donation = await this.createDonation({ amount, childNeed, user });
    console.log('Donatioın:', donation);

    return donation;
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
