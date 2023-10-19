import { Entity, Column, OneToMany } from 'typeorm';
import { CityEnum } from 'src/database/user';
import BaseUser from 'src/database/user/baseUser';
import UserRequest from 'src/database/user/userRequest.entity';
import Identification from 'src/database/user/identification.entity';

@Entity()
export default class User extends BaseUser {
  @Column('date')
  dateOfBirth: Date;

  @Column('boolean', { default: false })
  canLogin: boolean;

  @Column('enum')
  city: CityEnum;

  @OneToMany(() => UserRequest, (userRequest) => userRequest.user)
  userRequests: UserRequest[];

  @OneToMany(() => Identification, (identification) => identification.user)
  identifications: Identification[];

  @HasMany(() => SponsorShip)
  sponsorShip: SponsorShip[];
}

// import {
//   DataType,
//   Table,
//   Column,
//   Model,
//   BeforeCreate,
//   IsEmail,
//   HasMany,
//   Index,
//   Default,
//   AfterCreate,
// } from 'sequelize-typescript';
// import { UserRequest } from './userRequest.entity';
// import { Identification } from './identification.entity';
// import { SponsorShip } from '../sponsor/sponsorShip.entity';

// @Table({ timestamps: true })
// export class User extends Model {
//   @Index
//   @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
//   userId: number;

//   @Column(DataType.STRING)
//   name: string;

//   @Column(DataType.STRING)
//   lastname: string;

//   @Column(DataType.STRING)
//   fullName: string;

//   @Column(DataType.STRING)
//   password: string;

//   @IsEmail
//   @Column(DataType.STRING)
//   email: string;

//   @Default(Role.Authority)
//   @Column(DataType.ENUM(...Object.values(Role)))
//   role: Role;

//   @Column(DataType.DATE)
//   dateOfBirth: Date;

//   @Default(false)
//   @Column(DataType.INTEGER)
//   canLogin: boolean;

//   @Column(DataType.ENUM(...Object.values(CityEnum)))
//   city: CityEnum;

//   @HasMany(() => UserRequest)
//   userRequests: UserRequest[];

//   @HasMany(() => Identification)
//   identification: Identification[];

//   @HasMany(() => SponsorShip)
//   sponsorShip: SponsorShip[];

//   @BeforeCreate
//   static addFullName(userInstance: User) {
//     const { name, lastname } = userInstance;
//     userInstance.name = name[0].toUpperCase() + name.substring(1).toLowerCase();
//     userInstance.lastname =
//       lastname[0].toUpperCase() + lastname.substring(1).toLowerCase();
//     userInstance.fullName = userInstance.name + ' ' + userInstance.lastname;
//   }

//   @AfterCreate
//   static async generateRequest(userInstance: User) {
//     console.log('dsadsasadas', userInstance.toJSON());
//   }
// }
