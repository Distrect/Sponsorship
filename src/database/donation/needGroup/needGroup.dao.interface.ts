import { INeedWithTotal } from 'src/database/donation/childNeed/childNeed.dao.interface';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export abstract class NeedGroupWithNeedsWithTotalDonation extends NeedGroup {
  needs: INeedWithTotal[];
}
