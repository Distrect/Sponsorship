import { Injectable } from '@nestjs/common';
import ChildService from 'src/modules/userModule/childModule/child.service';

@Injectable()
export default class ChildManagementRouteService {
  constructor(private childService: ChildService) {}

  public async getChildCard(childId: number) {}
}
