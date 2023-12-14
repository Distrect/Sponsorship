import { CityEnum, Role } from 'src/database/user';
import { Request } from 'express';

export interface IUserCookie {
  userId: number;
  name: string;
  lastname: string;
  fullName: string;
  email: string;
  role: Role;
  city: CityEnum;
}

export interface ExtendedRequest extends Request {
  user?: IUserCookie;
}
