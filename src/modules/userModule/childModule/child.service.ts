import { Injectable } from '@nestjs/common';
import type {
  ICreateChild,
  IFilterChilds,
  ISortChilds,
} from 'src/modules/userModule/childModule/child.module.interface';
import type { IUserCookie } from 'src/shared/types';
import type { ChildWhere } from 'src/database/user/child/child.DAO.interface';
import { EditChildDTO } from 'src/routes/authorityRoutes/childManagement/childManagement.interface';
import Child from 'src/database/user/child/child.entity';
import ChildDAO from 'src/database/user/child/child.DAO';
import ChildStatusDAO from 'src/database/user/childStatus/childStatus.DAO';
import SafeDAO from 'src/database/donation/safe/safe.DAO';
import ChildStatus from 'src/database/user/childStatus/childStatus.entity';

@Injectable()
export default class ChildService {
  constructor(
    private safeDAO: SafeDAO,
    private childDAO: ChildDAO,
    private childStatusDAO: ChildStatusDAO,
  ) {}

  public async createChild(authority: IUserCookie, createParams: ICreateChild) {
    const city = authority.city;

    const childStatus = await this.childStatusDAO.createChildStatus({
      text: 'Child is 7th grade',
    });

    const childSafe = await this.safeDAO.createChildSafe({ totalMoney: 0 });

    const child = await this.childDAO.createChild({
      safe: childSafe,
      status: [childStatus],
    });

    return child;
  }

  public async getChild(childSearchParams: ChildWhere) {
    const child = await this.childDAO.getChild(childSearchParams);

    const childSafe = await this.safeDAO.getChildSafe({ child });

    child.safe = childSafe;

    return child;
  }

  public async getChildCard(childId: number) {
    return await this.childDAO.getChildCard(childId);
  }

  public async deleteChild(childId: number, authority: IUserCookie) {
    const deletedChild = await this.childDAO.deleteChild(childId);

    return deletedChild;
  }

  public async editChild(childId: number, body: EditChildDTO) {
    const editedChild = await this.childDAO.updateChild(childId, body);

    return editedChild;
  }

  public async listChilds(
    authority: IUserCookie,
    filters: IFilterChilds,
    sort: ISortChilds,
    page: number,
  ) {
    const listedChilds = await this.childDAO.listChilds(filters, sort, page);

    return listedChilds;
  }
}
