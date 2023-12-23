import { Injectable } from '@nestjs/common';
import { ListChildwithNeedsDTO } from 'src/routes/userRoutes/childInNeed/childInNeed.interface';
import NeedGroupService from 'src/modules/donationModule/needGroup/needGroup.service';

@Injectable()
export default class ChildInNeedRouteService {
  constructor(private needGroupService: NeedGroupService) {}

  public async listDonatableChildwithNeeds(body: ListChildwithNeedsDTO) {
    return await this.needGroupService.listChildwtihNeeds(body.filters);
  }
}
