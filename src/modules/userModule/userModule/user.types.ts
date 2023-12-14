import { Role } from 'src/database/user';
import type Admin from 'src/database/user/admin/admin.entity';
import type Authority from 'src/database/user/authority/authority.entity';
import type Child from 'src/database/user/child/child.entity';
import type User from 'src/database/user/user/user.entity';

export type RoleEntity<T extends Role> = T extends Role.Admin
  ? Admin
  : T extends Role.Authority
  ? Authority
  : T extends Role.User
  ? User
  : T extends Role.Child
  ? Child
  : never;

export interface ILogInCredentials {
  email: string;
  password: string;
}
