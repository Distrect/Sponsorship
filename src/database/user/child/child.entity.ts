import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import Safe from 'src/database/donation/safe/safe.entity';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import BaseUser from 'src/database/user/baseUser';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';
import ChildStatus from 'src/database/user/childStatus.entity';
import Identification from 'src/database/user/identification/identification.entity';
// import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';

@Entity()
export default class Child extends BaseUser {
  @Column('date')
  dateOfBirth: Date;

  @Column('varchar', { default: '1' })
  story: string;

  @OneToOne(() => Safe, (safe) => safe.child)
  @JoinColumn()
  safe: Safe;

  @OneToMany(() => Identification, (identification) => identification.child)
  identifications: Identification[];

  // @OneToMany(() => Sponsorship, (sponsorship) => sponsorship.child)
  // sponsors: Sponsorship[];

  @OneToMany(() => ChildStatus, (childStatus) => childStatus.child)
  status: ChildStatus[];

  @OneToMany(() => FixNeed, (fixNeed) => fixNeed.child)
  fixNeeds: FixNeed[];

  @OneToMany(() => NeedGroup, (needGroup) => needGroup.child)
  needGroups: NeedGroup[];
}

/*
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

//   @HasMany(() => FixNeed)
//   fixNeed: FixNeed[];

//   @BeforeCreate
//   static addFullName(userInstance: Child) {
//     userInstance.fullName = userInstance.name + ' ' + userInstance.lastname;
//   }
// }
*/
