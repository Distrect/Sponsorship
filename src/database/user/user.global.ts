import { Column } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';

export enum CityEnum {
  LEFKOŞA = 'Lefkoşa',
  GİRNE = 'GİRNE',
  MAĞUSA = 'MAĞUSA',
  GÜZELYURT = 'GÜZELYURT',
  İSKELE = 'İSKELE',
}

export abstract class UserBase extends Model {
  @Column(DataTypes.STRING)
  name: string;

  @Column(DataTypes.STRING)
  lastname: string;

  @Column(DataTypes.STRING)
  password: string;

  @Column(DataTypes.STRING)
  email: string;

  @Column(DataTypes.DATE)
  dateOfBirth: Date;

  @Column(
    DataTypes.ENUM(
      CityEnum.GÜZELYURT,
      CityEnum.GİRNE,
      CityEnum.LEFKOŞA,
      CityEnum.MAĞUSA,
      CityEnum.İSKELE,
    ),
  )
  city: CityEnum;
}
