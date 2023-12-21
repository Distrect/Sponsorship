import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { FixNeedStatus } from 'src/database/sponsor';
import FixNeedDao from 'src/database/sponsor/fixNeed/fixNeed.dao';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import {
  CreateFixNeedDTO,
  GetFixNeedsDTO,
} from 'src/routes/authorityRoutes/fixNeedManagement/fixNeedManagamenet.interface';

@Injectable()
export default class FixNeedService {
  constructor(private fixNeedDao: FixNeedDao) {}

  public async gtFixNeedsOfChild(childId: number, body: GetFixNeedsDTO) {
    return await this.fixNeedDao.getChildFixNeeds(childId, body);
  }

  public async createFixNeed(body: CreateFixNeedDTO, childId: number) {
    const newFixNeed = await this.fixNeedDao.createFixNeed(childId, {
      ...body,
    });

    const fixNeed = await this.fixNeedDao.getFixNeedWithSponsorship(
      newFixNeed.fixNeedId,
    );

    return fixNeed;
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

    console.log('Updated Fix Need', updatedFixNeed);

    const fixNeedWithSponsorship =
      await this.fixNeedDao.getFixNeedWithSponsorship(updatedFixNeed.fixNeedId);
    console.log('Updated Fix Need', fixNeedWithSponsorship);

    return fixNeedWithSponsorship;
  }
}
