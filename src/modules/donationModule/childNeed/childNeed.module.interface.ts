import { IsNotEmpty, Min } from 'class-validator';
import { NeedUrgency } from 'src/database/donation';
import { CityEnum } from 'src/database/user';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';

class Need implements Partial<ChildNeed> {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  urgency: NeedUrgency;
}

export class CreateNeedDTO {
  @IsNotEmpty()
  needs: Need[];

  // @IsNotEmpty()
  // title: string;
}

export class EditNeed implements Partial<ChildNeed> {
  @IsNotEmpty()
  needId: number;

  title: string;

  description: string;

  @Min(0)
  price: number;

  @Min(0)
  amount: number;

  categoryId: number;
}

export class EditNeedDTO {
  editedNeeds: EditNeed[];
}

export class ListChildWithNeeds {
  city?: CityEnum;
  urgency?: NeedUrgency;
  age?: [number, number];
}

export class DonateToNeed {
  needId: number;
  cost: number;
}

export class DonateToChild {
  childId: number;
  needs: DonateToNeed[];
}

export class DonationHistoryParams {
  dateRange?: [Date, Date];
}
