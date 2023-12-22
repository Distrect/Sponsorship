import { DeepPartial, FindOptionsWhere } from 'typeorm';
import Child from 'src/database/user/child/child.entity';
import { CityEnum } from 'src/database/user';

export type ChildWhere = FindOptionsWhere<Child>;
export type DeepPartialChild = DeepPartial<Child>;

export interface IListedChild {
  name: string;
  lastname: string;
  city: CityEnum;
  age: number;
  idNumber: string;
}
