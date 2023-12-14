import { CityEnum, NationalityEnum } from 'src/database/user';

export interface IIdentification {
  nationality: NationalityEnum;
  idNumber: string;
}

export interface IRegisterUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  city: CityEnum;
  identifications: IIdentification[];
  dateOfBirth: Date;
}
