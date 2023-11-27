import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { NotFound } from 'src/utils/error';
import { FixNeedStatus } from 'src/database/sponsor';
import FixNeed from 'src/database/sponsor/dao/fixNeed/fixNeed.entity';

@Injectable()
export default class FixNeedDao {
  @Injector(FixNeed) private fixNeedRepository: Repository<FixNeed>;

  private async saveFixNeedEntity(entity: FixNeed) {
    return await this.fixNeedRepository.save(entity);
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

    return await this.saveFixNeedEntity(
      this.updateClassInstance(fixNeed, updateParams),
    );
  }
}
