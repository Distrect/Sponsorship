import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { NotFound } from 'src/utils/error';
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { INeedWithTotal } from 'src/database/donation/childNeed/childNeed.dao.interface';
import {
  DonateToNeed,
  ListChildWithNeeds,
} from 'src/modules/donationModule/childNeed/childNeed.module.interface';
import UserDao from 'src/database/user/user/user.dao';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';

@Injectable()
export default class ChildNeedDao {
  @Injector(ChildNeed) private childNeedRepository: Repository<ChildNeed>;
  private userDao: UserDao;

  private updateInstance(
    needEntity: ChildNeed,
    updateParams: DeepPartial<ChildNeed>,
  ) {
    for (const [key, val] of Object.entries(updateParams)) {
      needEntity[key] = val;
    }

    return needEntity;
  }

  private async saveChildNeed(childNeedEntity: ChildNeed) {
    return this.childNeedRepository.save(childNeedEntity);
  }

  public async createNeed(childNeed: DeepPartial<ChildNeed>) {
    const childNeeds = this.childNeedRepository.create(childNeed);

    return await this.saveChildNeed(childNeeds);
  }

  public async getNeed(
    attributes: FindOptionsWhere<ChildNeed> | FindOptionsWhere<ChildNeed>[],
  ) {
    if (Array.isArray(attributes)) {
      const needs = await this.childNeedRepository.find({
        where: { ...attributes },
      });

      if (needs.some((need) => !!need === false)) throw new NotFound();
      return needs;
    }

    const need = await this.childNeedRepository.findOne({
      where: { ...attributes },
    });

    if (!need) throw new NotFound();

    return need;
  }

  public async getNeedWithTotalDonation(needId: number) {
    const needWithTotal = (await this.childNeedRepository
      .createQueryBuilder('child_need')
      .leftJoinAndSelect('child_need.donations', 'donation')
      .select([
        'child_need.*',
        'SUM(IFNULL("donation.amount",0)) as totalDonation',
      ])
      .where('child_need.needId  = :needId AND child_need = :isDeleted', {
        needId,
        idDeleted: false,
      })
      .getRawOne()) as INeedWithTotal;

    if (!needWithTotal) throw new NotFound();

    return needWithTotal;
  }

  public async updateNeed({ needId, ...rest }: DeepPartial<ChildNeed>) {
    if (!needId) throw new NotFound();

    const need = (await this.getNeed({ needId })) as ChildNeed;

    const updatedNeed = await this.saveChildNeed(
      this.updateInstance(need, rest),
    );

    return updatedNeed;
  }

  public async deleteNeed(needId: number) {
    const deletedNeed = await this.updateNeed({ needId, isDeleted: true });

    return deletedNeed;
  }

  public async donateToChild({ needId, cost }: DonateToNeed) {
    const needWithTotalDonation = await this.getNeedWithTotalDonation(needId);
  }

  /*
  public async listNeedsWithChild(
    userId: number,
    { age, city, urgency }: ListChildWithNeeds,
  ) {
    await this.userDao.getUser({ userId });

    let needListWİthChild = this.needGroupRepository
      .createQueryBuilder('need_group')
      .leftJoinAndSelect('need_group.child', 'child')
      .leftJoinAndSelect('need_group.needs', 'child_need');

    if (age) {
      needListWİthChild = needListWİthChild.andWhere(
        'child.age BETWEEN :min and :max',
        {
          min: age[0],
          max: age[1],
        },
      );
    }

    if (city) {
      needListWİthChild = needListWİthChild.andWhere('child.city = :city', {
        city,
      });
    }

    if (urgency) {
      needListWİthChild = needListWİthChild.andWhere(
        'child_need.urgency = :urgency',
        { urgency },
      );
    }

    // sort edilmesi gerek

    const count = await needListWİthChild.getCount();

    return await needListWİthChild.getMany();
  }
*/
}
