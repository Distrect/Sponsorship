import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  BeforeCreate,
  IsEmail,
  HasMany,
} from 'sequelize-typescript';
import { CityEnum } from './user.global';
import { UserRequest } from './userRequest.entity';
import { SponsorShipRequest } from '../sponsor/sponsorShipRequest';

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

  @Column(DataTypes.ENUM(...Object.values(CityEnum)))
  city: CityEnum;

  @HasMany(() => UserRequest)
  userRequests: UserRequest[];

  @HasMany(() => SponsorShipRequest)
  sponsorShipRequest: SponsorShipRequest[];

  @BeforeCreate
  static addFullName(userInstance: Authority) {
    userInstance.fullName = userInstance.name + ' ' + userInstance.lastname;
  }
}
