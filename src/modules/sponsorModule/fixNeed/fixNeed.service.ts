import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { FixNeedStatus, SponsorshipStatus } from 'src/database/sponsor';
import FixNeedDAO from 'src/database/sponsor/fixNeed/fixNeed.DAO';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import {
  CreateFixNeedDTO,
  GetFixNeedsDTO,
} from 'src/routes/authorityRoutes/fixNeedManagement/fixNeedManagamenet.interface';
import ChildDAO from 'src/database/user/child/child.DAO';

@Injectable()
export default class FixNeedService {
  constructor(
    private fixNeedDAO: FixNeedDAO,
    private childDAO: ChildDAO,
  ) {}

  public async gtFixNeedsOfChild(childId: number, body: GetFixNeedsDTO) {
    return await this.fixNeedDAO.getChildFixNeeds(childId, body);
  }

  public async getFixNeedsOfChild(childId: number) {
    const child = await this.childDAO.getChild({ userId: childId });
    const fixNeeds = await this.fixNeedDAO.getFreeFixNeedofChild(child.userId);

    return fixNeeds;
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

    return fixNeedWithSponsorship;
  }
}
