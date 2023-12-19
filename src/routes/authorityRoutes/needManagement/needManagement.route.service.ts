import { Injectable } from '@nestjs/common';
import ChildNeedService from 'src/modules/donationModule/childNeed/childNeed.service';

@Injectable()
export default class NeedManagementRouteService {
  constructor(private childNeedService: ChildNeedService) {}
}
