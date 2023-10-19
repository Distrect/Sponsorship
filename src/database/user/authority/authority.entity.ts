import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { CityEnum } from 'src/database/user';
import BaseUser from 'src/database/user/baseUser';

@Entity()
export class Authority extends BaseUser {
  @Column('date')
  dateOfBirth: Date;

  @Column({ type: 'enum' })
  city: CityEnum;
  /*
  @HasMany(() => UserRequest)
  userRequests: UserRequest[];

  @HasMany(() => SponsorShipRequest)
  sponsorShipRequest: SponsorShipRequest[];
*/
}

//import { DataTypes } from 'sequelize';
/*import {
  Table,
  Column,
  Model,
  BeforeCreate,
  IsEmail,
  HasMany,
  Default,
} from 'sequelize-typescript';*/

/*
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

  @Default(Role.Authority)
  @Column(DataTypes.ENUM(...Object.values(Role)))
  role: Role;

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
*/
