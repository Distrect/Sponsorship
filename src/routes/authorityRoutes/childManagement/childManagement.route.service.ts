import { Injectable } from '@nestjs/common';
import ChildService from 'src/modules/userModule/childModule/child.service';
import {
  EditChildDTO,
  ListChildDTO,
} from 'src/routes/authorityRoutes/childManagement/childManagement.interface';
import { IUserCookie } from 'src/shared/types';

@Injectable()
export default class ChildManagementRouteService {
  constructor(private childService: ChildService) {}

  public async listChilds(
    requestBody: ListChildDTO,
    page: number,
    authority: IUserCookie,
  ) {
    return await this.childService.listChilds(
      authority,
      requestBody.filters,
      requestBody.sort,
      page,
    );
  }

  public async deleteChild(childId: number, authority: IUserCookie) {
    return await this.childService.deleteChild(childId, authority);
  }

  public async editChild(
    authority: IUserCookie,
    childId: number,
    requestBody: EditChildDTO,
  ) {
    return await this.childService.editChild(childId, requestBody);
  }

  public async getChildCard(childId: number) {
    return await this.childService.getChildCard(childId);
  }
}
