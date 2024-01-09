import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { CityEnum } from 'src/database/user';
import Child from 'src/database/user/child/child.entity';
import {
  IFilterChilds,
  ISortChilds,
} from 'src/modules/userModule/childModule/child.module.interface';

export interface IListChildsQuery {
  page: number;
}

export class CreateChildDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNotEmpty()
  story: string;
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
