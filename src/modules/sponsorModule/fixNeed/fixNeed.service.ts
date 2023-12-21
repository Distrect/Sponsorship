import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { FixNeedStatus } from 'src/database/sponsor';
import FixNeedDAO from 'src/database/sponsor/fixNeed/fixNeed.DAO';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import {
  CreateFixNeedDTO,
  GetFixNeedsDTO,
} from 'src/routes/authorityRoutes/fixNeedManagement/fixNeedManagamenet.interface';

@Injectable()
export default class FixNeedService {
  constructor(private fixNeedDAO: FixNeedDAO) {}

  public async gtFixNeedsOfChild(childId: number, body: GetFixNeedsDTO) {
    return await this.fixNeedDAO.getChildFixNeeds(childId, body);
  }

  public async createFixNeed(body: CreateFixNeedDTO, childId: number) {
    const newFixNeed = await this.fixNeedDAO.createFixNeed(childId, {
      ...body,
    });

    const fixNeed = await this.fixNeedDAO.getFixNeedWithSponsorship(
      newFixNeed.fixNeedId,
    );

    return fixNeed;
  }

  public async disableFixNeed(fixNeedId: number) {
    const disabledFixNeed = await this.fixNeedDAO.changeFixNeedStatus(
      fixNeedId,
      FixNeedStatus.DEACTIVE,
    );

    return disabledFixNeed;
  }

  public async updateFixNeed(
    fixNeedId: number,
    updateParams: DeepPartial<FixNeed>,
  ) {
    const updatedFixNeed = await this.fixNeedDAO.updateFixNeed(
      fixNeedId,
      updateParams,
    );

    console.log('Updated Fix Need', updatedFixNeed);

    const fixNeedWithSponsorship =
      await this.fixNeedDAO.getFixNeedWithSponsorship(updatedFixNeed.fixNeedId);
    console.log('Updated Fix Need', fixNeedWithSponsorship);

    return fixNeedWithSponsorship;
  }
}
