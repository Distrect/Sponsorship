import { IsNotEmpty, IsOptional } from 'class-validator';
import { IDonateNeed } from 'src/database/donation/childNeed/childNeed.DAO.interface';
import { IFilterNeedGroup } from 'src/database/donation/needGroup/needGroup.DAO.interface';

interface IHashedNeed {
  [needId: number]: IDonateNeed;
}

export class ListChildwithNeedsDTO {
  @IsOptional()
  filters: IFilterNeedGroup;
}

export class IDonateChildNeedDTO {
  @IsNotEmpty()
  needGroupId: number;

  @IsNotEmpty()
  donatedNeeds: IHashedNeed;

  public getNeedIDs() {
    console.log(
      'uy',
      Object.entries(this.donatedNeeds).map(([key]) => key),
    );
    return Object.entries(this.donatedNeeds).map(([key]) => key);
  }
}
