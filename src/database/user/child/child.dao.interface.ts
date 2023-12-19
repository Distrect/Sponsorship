import { DeepPartial, FindOptionsWhere } from 'typeorm';
import Child from 'src/database/user/child/child.entity';

export type ChildWhere = FindOptionsWhere<Child>;
export type DeepPartialChild = DeepPartial<Child>;
