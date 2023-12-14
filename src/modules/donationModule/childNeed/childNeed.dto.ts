import { IsNotEmpty, Min } from 'class-validator';
import { NeedUrgency } from 'src/database/donation';
import { CityEnum } from 'src/database/user';

class Need {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  categoryId: number;
}
export class EditNeed {
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

export class CreateNeedDTO {
  @IsNotEmpty()
  public needs: Need[];

  @IsNotEmpty()
  needExplanation: string;
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
