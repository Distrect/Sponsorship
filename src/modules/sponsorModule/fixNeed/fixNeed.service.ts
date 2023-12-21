import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { FixNeedStatus } from 'src/database/sponsor';
import { CreateFixNeedDTO } from 'src/modules/sponsorModule/fixNeed/fixNeed.dto';
import FixNeedDao from 'src/database/sponsor/fixNeed/fixNeed.dao';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';

@Injectable()
export default class FixNeedService {
  constructor(private fixNeedDao: FixNeedDao) {}

  public async gtFixNeedsOfChild(childId: number) {
    return await this.fixNeedDao.getChildFixNeeds(childId);
  }

  public async createFixNeed(body: CreateFixNeedDTO, childId: number) {
    const newFixNeed = await this.fixNeedDao.createFixNeed({
      ...body,
      child: { userId: childId },
    });

    return newFixNeed;
  }

  public async disableFixNeed(fixNeedId: number) {
    const disabledFixNeed = await this.fixNeedDao.changeFixNeedStatus(
      fixNeedId,
      FixNeedStatus.DEACTIVE,
    );

    return disabledFixNeed;
  }

  public async updateFixNeed(
    fixNeedId: number,
    updateParams: DeepPartial<FixNeed>,
  ) {
    const updatedFixNeed = await this.fixNeedDao.updateFixNeed(
      fixNeedId,
      updateParams,
    );

    return updatedFixNeed;
  }
}
