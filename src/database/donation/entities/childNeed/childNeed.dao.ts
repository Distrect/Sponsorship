import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import ChildNeed from 'src/database/donation/entities/childNeed/childNeed.entity';
import { NotFound } from 'src/utils/error';

export interface INeedWithTotal extends ChildNeed {
  totalDonation: number;
}

@Injectable()
export default class ChildNeedDao {
  @Injector(ChildNeed) private childNeedRepository: Repository<ChildNeed>;

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

      if (needs.length !== attributes.length) throw new NotFound();
      return needs;
    }

    const need = await this.childNeedRepository.findOne({
      where: { ...attributes },
    });

    if (!need) throw new NotFound();

    return need;
  }

  public async getNeedsWithTotalDonation(needId: number) {
    const needWithTotal = (await this.childNeedRepository
      .createQueryBuilder('child_need')
      .leftJoinAndSelect('child_need.donations', 'donation')
      .select(['child_need.*', 'SUM(donation.amount) as totalDonation'])
      .where('child_need.needId  = :needId', { needId })
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
    // const updatedNeed = await this.childNeedRepository.save(need);
    // const updatedNeed = await this.childNeedRepository.save({
    //   needId,
    //   ...rest,
    // });

    return updatedNeed;
  }

  public async deleteNeed(needId: number) {
    const deletedNeed = await this.updateNeed({ needId, isDeleted: true });

    return deletedNeed;
  }
}
