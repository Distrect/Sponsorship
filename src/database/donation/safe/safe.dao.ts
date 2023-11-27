import { Injectable } from '@nestjs/common';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import { NotFound } from 'src/utils/error';
import Safe from 'src/database/donation/entities/safe/safe.entity';

@Injectable()
export default class SafeDao {
  @Injector(Safe) private safeRepository: Repository<Safe>;

  private async saveSafeEntity(entity: Safe) {
    return await this.safeRepository.save(entity);
  }

  public async createChildSafe(childId: number) {
    const safeInstance = this.safeRepository.create({
      child: { userId: childId },
    });

    return await this.saveSafeEntity(safeInstance);
  }

  public async getChildSafe(safeParams: FindOptionsWhere<Safe>) {
    const safe = await this.safeRepository.findOne({
      where: { ...safeParams },
    });

    if (!safe) throw new NotFound();

    return safe;
  }

  public async setTotalMoney(money: number, childId: number) {
    if (money < 0)
      throw new Error(
        'Bro The Total Money Cannopt be Negative. Are you out of ypur Minfd',
      );

    const safe = await this.getChildSafe({ child: { userId: childId } });

    safe.totalMoney = money;

    return await this.saveSafeEntity(safe);
  }
}
