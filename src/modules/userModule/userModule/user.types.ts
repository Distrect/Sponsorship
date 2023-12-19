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
  : Child;

export interface ILogInCredentials {
  email: string;
  password: string;
}

type AdminDao<T> = {
  getAdmin: (args: T) => Promise<Admin>; // Replace `Admin` with the actual type of your admin entity.
};

type AuthorityDao = {
  getAuthority: () => Promise<Authority>; // Replace `Authority` with the actual type of your authority entity.
};

type UserDao = {
  getUser: () => Promise<User>; // Replace `User` with the actual type of your user entity.
};

type ChildDao = {
  getChild: () => Promise<Child>; // Replace `Child` with the actual type of your child entity.
};

export type DaoRole<T> = {
  Admin: AdminDao<T>['getAdmin'];
  Authority: AuthorityDao['getAuthority'];
  User: UserDao['getUser'];
  Child: ChildDao['getChild'];
};

// Now you can use ReturnType to infer the type of daoRole["Admin"]:
