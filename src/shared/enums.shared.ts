export enum Role {
  Authority = 'Authority',
  User = 'User',
  Admin = 'Admin',
  Child = 'Child',
}

type x = Record<keyof typeof Role, (typeof Role)[keyof typeof Role]>;

export const RoleObj: x = {
  Authority: Role.Authority,
  User: Role.Authority,
  Admin: Role.Authority,
  Child: Role.Authority,
};
