import { Injectable } from '@nestjs/common';
import {
  IDonateChildNeedDTO,
  ListChildwithNeedsDTO,
} from 'src/routes/userRoutes/childInNeed/childInNeed.interface';
import NeedGroupService from 'src/modules/donationModule/needGroup/needGroup.service';
import { UserRouteService } from 'src/routes/userRoutes/user.route.service';
import { IUserCookie } from 'src/shared/types';

@Injectable()
export default class ChildInNeedRouteService extends UserRouteService {
  constructor(private needGroupService: NeedGroupService) {
    super();
  }

  public async listDonatableChildwithNeeds(
    body: ListChildwithNeedsDTO,
    page: number,
  ) {
    return await this.needGroupService.listChildwtihNeeds(body.filters, page);
  }

  public async donateToNeeds(
    user: IUserCookie,
    requestBody: IDonateChildNeedDTO,
  ) {
    return await this.needGroupService.donateToNeeds(user, requestBody);
  }
}
