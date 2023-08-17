import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  BeforeCreate,
  IsEmail,
} from 'sequelize-typescript';
import { CityEnum } from './user.global';

@Table({ timestamps: true })
export class Authority extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  userId: number;

  @Column(DataTypes.STRING)
  name: string;

  @Column(DataTypes.STRING)
  lastname: string;

  @Column(DataTypes.STRING)
  fullName: string;

  @Column(DataTypes.STRING)
  password: string;

  @IsEmail
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

  @BeforeCreate
  static addFullName(userInstance: Authority) {
    userInstance.fullName = userInstance.name + ' ' + userInstance.lastname;
  }
}
