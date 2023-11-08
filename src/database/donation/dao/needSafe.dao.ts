import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { NeedSafeType } from 'src/database/donation/entities';
import { DeepPartial, Repository } from 'typeorm';
import NeedSafe from 'src/database/donation/entities/needSafe.entity';

@Injectable()
export default class NeedSafeDao {
  @Injector(NeedSafe) private needSafeRepository: Repository<NeedSafe>;

  private async saveNeedSafeEntity(entity: NeedSafe) {
    return await this.needSafeRepository.save(entity);
  }

  public async createRecordForNeedSafe(
    params: DeepPartial<NeedSafe>,
    type: NeedSafeType,
  ) {
    const needSafeInstance = this.needSafeRepository.create({
      ...params,
      type,
    });

    return await this.saveNeedSafeEntity(needSafeInstance);
  }
}
