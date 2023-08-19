import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  BeforeCreate,
  IsEmail,
  HasMany,
  PrimaryKey,
  Index,
  Default,
} from 'sequelize-typescript';
import { CityEnum } from './user.global';
import { UserRequest } from './userRequest.entity';

@Table({ timestamps: true })
export class User extends Model {
  @Index
  @PrimaryKey
  @Column(DataTypes.INTEGER)
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

  @Default(false)
  @Column(DataTypes.INTEGER)
  canLogin: boolean;

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

  @HasMany(() => UserRequest)
  requests: UserRequest[];

  @BeforeCreate
  static addFullName(userInstance: User) {
    userInstance.fullName = userInstance.name + ' ' + userInstance.lastname;
  }
}
