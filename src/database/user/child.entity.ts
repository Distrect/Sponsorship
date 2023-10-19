import { Entity, Column } from 'typeorm';
import { CityEnum } from 'src/database/user';
import BaseUser from 'src/database/user/baseUser';

@Entity()
export default class Child extends BaseUser {
  @Column('date')
  dateOfBirth: Date;

  @Column('enum')
  city: CityEnum;

  @Column('text')
  story: string;
  /*
  @HasMany(() => ChildStatus)
  status: ChildStatus[];*/
}

// import { DataTypes } from 'sequelize';
// import {
//   Table,
//   Column,
//   Model,
//   BeforeCreate,
//   IsEmail,
//   HasMany,
//   Default,
// } from 'sequelize-typescript';
// import { ChildStatus } from './childStatus.entity';
// import { FixNeed } from '../sponsor/fixNeed.entity';
// @Table({ timestamps: true })
// export class Child extends Model {
//   @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
//   userId: number;

//   @Column(DataTypes.STRING)
//   name: string;

//   @Column(DataTypes.STRING)
//   lastname: string;

//   @Column(DataTypes.STRING)
//   fullName: string;

//   @Column(DataTypes.STRING)
//   password: string;

//   @IsEmail
//   @Column(DataTypes.STRING)
//   email: string;

//   @Default(Role.Child)
//   @Column(DataTypes.ENUM(...Object.values(Role)))
//   role: Role;

//   @Column(DataTypes.DATE)
//   dateOfBirth: Date;

//   @Column(DataTypes.ENUM(...Object.values(CityEnum)))
//   city: CityEnum;

//   @Column(DataTypes.TEXT)
//   story: string;

//   @HasMany(() => ChildStatus)
//   status: ChildStatus[];

//   @HasMany(() => FixNeed)
//   fixNeed: FixNeed[];

//   @HasMany(() => SponsorShip)
//   sponsorShip: SponsorShip[];

//   @BeforeCreate
//   static addFullName(userInstance: Child) {
//     userInstance.fullName = userInstance.name + ' ' + userInstance.lastname;
//   }
// }
