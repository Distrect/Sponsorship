import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  BeforeCreate,
  IsEmail,
  HasMany,
  Default,
} from 'sequelize-typescript';
import { CityEnum } from './user.global';
import { ChildStatus } from './childStatus.entity';
import { FixNeed } from '../sponsor/fixNeed.entity';
import { SponsorShip } from '../sponsor/sponsorShip.entity';
import { Role } from 'src/database/user';

@Table({ timestamps: true })
export class Child extends Model {
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

  @Default(Role.Child)
  @Column(DataTypes.ENUM(...Object.values(Role)))
  role: Role;

  @Column(DataTypes.DATE)
  dateOfBirth: Date;

  @Column(DataTypes.ENUM(...Object.values(CityEnum)))
  city: CityEnum;

  @Column(DataTypes.TEXT)
  story: string;

  @HasMany(() => ChildStatus)
  status: ChildStatus[];

  @HasMany(() => FixNeed)
  fixNeed: FixNeed[];

  @HasMany(() => SponsorShip)
  sponsorShip: SponsorShip[];

  @BeforeCreate
  static addFullName(userInstance: Child) {
    userInstance.fullName = userInstance.name + ' ' + userInstance.lastname;
  }
}
