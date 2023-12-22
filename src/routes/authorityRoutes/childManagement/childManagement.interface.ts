import { IsOptional } from 'class-validator';
import Child from 'src/database/user/child/child.entity';
import {
  IFilterChilds,
  ISortChilds,
} from 'src/modules/userModule/childModule/child.module.interface';

export interface IListChildsQuery {
  page: number;
}

export class EditChildDTO implements Partial<Child> {
  name?: string;
  lastname?: string;
  dateOfBirth?: Date;
  story?: string;
  //   idNumber?: string;
}

export class ListChildDTO {
  @IsOptional()
  filters?: IFilterChilds;

  @IsOptional()
  sort?: ISortChilds;
}
