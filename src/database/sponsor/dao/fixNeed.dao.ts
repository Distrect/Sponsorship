import { DeepPartial, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import FixNeed from 'src/database/sponsor/entities/fixNeed.entity';

@Injectable()
export default class FixNeedDao {
  @Injector(FixNeed) private fixNeedRepository: Repository<FixNeed>;

  private async saveFixNeedEntity(entity: FixNeed) {
    return await this.fixNeedRepository.save(entity);
  }

  public async createFixNeed(fixNeedParams: DeepPartial<FixNeed>) {
    const fixNeedInstance = this.fixNeedRepository.create({ ...fixNeedParams });
    return await this.saveFixNeedEntity(fixNeedInstance);
  }
}
