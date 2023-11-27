import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import BaseUser from 'src/database/user/baseUser';
import Sponsorship from 'src/database/sponsor/dao/sponsorship/sponsorship.entity';
import ChildStatus from 'src/database/user/childStatus.entity';
import FixNeed from 'src/database/sponsor/dao/fixNeed/fixNeed.entity';
import Identification from 'src/database/user/identification/identification.entity';
import Safe from 'src/database/donation/entities/safe/safe.entity';
import ChildNeedGroup from 'src/database/donation/entities/childNeedGroup/childNeedGroup.entity';

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

  @OneToMany(() => Sponsorship, (sponsorship) => sponsorship.child)
  sponsors: Sponsorship[];

  @OneToMany(() => ChildStatus, (childStatus) => childStatus.child)
  status: ChildStatus[];

  @OneToMany(() => FixNeed, (fixNeed) => fixNeed.child)
  fixNeeds: FixNeed[];

  @OneToMany(() => ChildNeedGroup, (needGroup) => needGroup.child)
  needGroups: ChildNeedGroup[];
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

//   @HasMany(() => FixNeed)
//   fixNeed: FixNeed[];

//   @BeforeCreate
//   static addFullName(userInstance: Child) {
//     userInstance.fullName = userInstance.name + ' ' + userInstance.lastname;
//   }
// }
