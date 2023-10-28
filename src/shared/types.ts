import { CityEnum, Role } from 'src/database/user';

export interface IUserCookie {
  userId: number;
  name: string;
  lastname: string;
  fullName: string;
  email: string;
  role: Role;
  city: CityEnum;
}
