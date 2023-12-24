import { IsNotEmpty, IsOptional } from 'class-validator';
import { IFilterNeedGroup } from 'src/database/donation/needGroup/needGroup.DAO.interface';

export class ListChildwithNeedsDTO {
  @IsOptional()
  filters: IFilterNeedGroup;
}
