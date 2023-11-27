import { Injectable } from '@nestjs/common';
import NeedSafeDao from 'src/database/donation/entities/needSafe/needSafe.dao';
import { NeedSafeType } from 'src/database/donation';
import SafeDao from 'src/database/donation/entities/safe/safe.dao';

@Injectable()
export default class SafeService {
  private needSafeDao: NeedSafeDao;
  private childSafeDao: SafeDao;

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

    const totalMoney = await this.needSafeDao.getTotalOfNeedSafe(
      NeedSafeType.INCOME,
      { childNeed: { needId } },
    );

    await this.childSafeDao.setTotalMoney(totalMoney, childId);

    return needSafeRecord;
  }
}
