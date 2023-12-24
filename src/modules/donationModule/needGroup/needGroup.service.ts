import { Injectable } from '@nestjs/common';
import { IFilterNeedGroup } from 'src/database/donation/needGroup/needGroup.DAO.interface';
import NeedGroupDAO from 'src/database/donation/needGroup/needGroup.DAO';

@Injectable()
export default class NeedGroupService {
  constructor(private needGroupDAO: NeedGroupDAO) {}

  public async listChildwtihNeeds(filters: IFilterNeedGroup, page: number) {
    const result = await this.needGroupDAO.listSponsorableNeeds(filters, page);

    return result;
  }
}
