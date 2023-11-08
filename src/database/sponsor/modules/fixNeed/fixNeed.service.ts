import { Injectable } from '@nestjs/common';
import FixNeedDao from 'src/database/sponsor/dao/fixNeed.dao';
import { CreateFixNeedDTO } from 'src/database/sponsor/modules/fixNeed/fixNeed.dto';

@Injectable()
export default class FixNeedService {
  private fixNeedDao: FixNeedDao;

  public async createFixNeed(body: CreateFixNeedDTO, childId: number) {}
}
