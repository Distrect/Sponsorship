import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import { NotFound } from 'src/utils/error';
import { FixNeedStatus } from 'src/database/sponsor';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import ChildDao from 'src/database/user/child/child.dao';

@Injectable()
export default class FixNeedDao {
  @Injector(FixNeed) private fixNeedRepository: Repository<FixNeed>;
  private childDao: ChildDao;

  private async saveFixNeedEntity(entity: FixNeed) {
    return await this.fixNeedRepository.save(entity);
  }

  private async updateFixNeedEntity(
    entity: FixNeed,
    updateParams: DeepPartial<FixNeed>,
  ) {
    return await this.fixNeedRepository.save({
      ...updateParams,
      ...entity,
      fixNeedId: entity.fixNeedId,
    });
  }

  private updateClassInstance(
    entity: FixNeed,
    updatedParams: DeepPartial<FixNeed>,
  ) {
    for (const [key, val] of Object.entries(updatedParams)) {
      entity[key] = val;
    }

    return entity;
  }

  public async getChildFixNeeds(chldId: number) {
    const child = await this.childDao.getChild({ userId: chldId });

    const childFixNeeds = await this.fixNeedRepository
      .createQueryBuilder('fix_need')
      .leftJoin('fix_need.child', 'child')
      .where('child.userId = :userId', { userId: child.userId })
      .getMany();

    return childFixNeeds;
  }

  public async getDen(childId: number) {
    const child = await this.childDao.getChild({ userId: childId });

    const fixNeeds = await this.fixNeedRepository
      .createQueryBuilder('fix_need')
      .leftJoinAndSelect('fix_need.sponsorship', 'sponsorship')
      .where(' fix_need.child = :childId AND fix_need.status = :status', {
        status: FixNeedStatus.ACTIVE,
        childId: child.userId,
      })
      .getMany();

    return fixNeeds;
  }

  public async getUserSponsoredFixNeeds(userId: number, childId: number) {
    const fixNeeds = this.fixNeedRepository
      .createQueryBuilder('fix_need')
      .leftJoin('fix_need.sponsorship', 'sponsorship')
      // .addSelect(['sponsorship.status'])
      .where('sponsorship.user = :userId', { userId })
      .andWhere('fix_need.child = :childId', { childId });

    return await fixNeeds.getMany();
  }

  public async getAvailableFixNeeds(childId: number, userId: number) {
    const child = await this.childDao.getChild({ userId: childId });

    const fixNeeds = this.fixNeedRepository
      .createQueryBuilder('fix_need')
      .leftJoin('fix_need.sponsorship', 'sponsorship')
      .addSelect(['sponsorship.status'])
      .where(
        'sponsorship.fixNeed is NULL AND fix_need.child = :childId AND fix_need.status = :status',
        {
          status: FixNeedStatus.ACTIVE,
          childId: child.userId,
        },
      );

    return [
      ...(await this.getUserSponsoredFixNeeds(userId, childId)),
      ...(await fixNeeds.getMany()),
    ];
  }

  public async getFixNeed(params: FindOptionsWhere<FixNeed>) {
    const fixNeed = await this.fixNeedRepository.findOne({
      where: { ...params },
    });

    if (!fixNeed) throw new NotFound('The Child Fix Neeed Not Found');

    return fixNeed;
  }

  public async createFixNeed(fixNeedParams: DeepPartial<FixNeed>) {
    const fixNeedInstance = this.fixNeedRepository.create({ ...fixNeedParams });
    return await this.saveFixNeedEntity(fixNeedInstance);
  }

  public async changeFixNeedStatus(fixNeedId: number, status: FixNeedStatus) {
    const fixNeed = await this.getFixNeed({ fixNeedId });

    fixNeed.status = status;

    return await this.saveFixNeedEntity(fixNeed);
  }

  public async updateFixNeed(
    fixNeedId: number,
    updateParams: DeepPartial<FixNeed>,
  ) {
    const fixNeed = await this.getFixNeed({ fixNeedId });

    return await this.updateFixNeedEntity(fixNeed, updateParams);

    // return await this.saveFixNeedEntity(
    //   this.updateClassInstance(fixNeed, updateParams),
    // );
  }
}
