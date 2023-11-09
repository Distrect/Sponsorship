import { Injectable } from '@nestjs/common';
import NeedSafeDao from 'src/database/donation/dao/needSafe/needSafe.dao';
import { NeedSafeType } from 'src/database/donation';

@Injectable()
export default class SafeService {
  private needSafeDao: NeedSafeDao;

  public async depositMoneyToChild(
    needId: number,
    childId: number,
    money: number,
  ) {
    const needSafeRecord = await this.needSafeDao.createRecordForNeedSafe(
      {
        amount: money,
        childNeed: { needId },
      },
      NeedSafeType.INCOME,
    );

    return needSafeRecord;
  }
}
