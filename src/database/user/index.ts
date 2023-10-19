export enum Role {
  Authority = 'Authority',
  User = 'User',
  Admin = 'Admin',
  Child = 'Child',
}

export enum CityEnum {
  LEFKOŞA = 'Lefkoşa',
  GİRNE = 'GİRNE',
  MAĞUSA = 'MAĞUSA',
  GÜZELYURT = 'GÜZELYURT',
  İSKELE = 'İSKELE',
}

export enum Type {
  SIGNIN = 'Sign In',
}

export enum Status {
  APPROVED = 'Approved',
  DENIED = 'Denied',
  WAITING = 'Waiting',
  BANNED = 'Banned',
}

interface IBaseUser {
  name: string;
  lastname: string;
  email: string;
  role: Role;
}

export interface IAuthority extends IBaseUser {
  authorityId: number;
  city: CityEnum;
}

export interface IAdmin extends IBaseUser {
  adminId: number;
}
export interface IUser extends IBaseUser {
  userId: number;
}
