import { Injectable } from '@nestjs/common';
import type { ICreateChild } from 'src/modules/userModule/childModule/child.module.interface';
import type { IUserCookie } from 'src/shared/types';
import type { ChildWhere } from 'src/database/user/child/child.dao.interface';
import { EditChildDTO } from 'src/routes/authorityRoutes/childManagement/childManagement.interface';
import Child from 'src/database/user/child/child.entity';
import ChildDao from 'src/database/user/child/child.dao';
import ChildStatusDao from 'src/database/user/childStatus/childStatus.dao';
import SafeDao from 'src/database/donation/safe/safe.dao';
import ChildStatus from 'src/database/user/childStatus/childStatus.entity';

@Injectable()
export default class ChildService {
  constructor(
    private safeDao: SafeDao,
    private childDao: ChildDao,
    private childStatusDao: ChildStatusDao,
  ) {}

  public async createChild(authority: IUserCookie, createParams: ICreateChild) {
    const city = authority.city;

    const childStatus = await this.childStatusDao.createChildStatus({
      text: 'Child is 7th grade',
    });

    const childSafe = await this.safeDao.createChildSafe({ totalMoney: 0 });

    const child = await this.childDao.createChild({
      safe: childSafe,
      status: [childStatus],
    });

    return child;
  }

  public async getChild(childSearchParams: ChildWhere) {
    const child = await this.childDao.getChild(childSearchParams);

    const childSafe = await this.safeDao.getChildSafe({ child });

    child.safe = childSafe;

    return child;
  }

  public async getChildCard(childId: number) {
    return await this.childDao.getChildCard(childId);
  }

  public async deleteChild(childId: number, authority: IUserCookie) {
    const deletedChild = await this.childDao.deleteChild(childId);

    return deletedChild;
  }

  public async editChild(childId: number, body: EditChildDTO) {
    const editedChild = await this.childDao.updateChild(childId, body);

    return editedChild;
  }
}
