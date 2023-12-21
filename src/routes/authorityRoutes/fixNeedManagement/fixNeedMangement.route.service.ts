import { Injectable } from '@nestjs/common';
import FixNeedService from 'src/modules/sponsorModule/fixNeed/fixNeed.service';
import { IUserCookie } from 'src/shared/types';

@Injectable()
export default class FixNeedManagementRouteService {
  constructor(private fixNeedService: FixNeedService) {}

  public async getChildFixNeeds(childId: number, authority: IUserCookie) {
    return await this.fixNeedService.gtFixNeedsOfChild(childId);
  }
}
