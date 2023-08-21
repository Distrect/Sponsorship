import {
  DataType,
  Table,
  Column,
  Model,
  BeforeCreate,
  IsEmail,
  HasMany,
  Index,
  Default,
  AfterCreate,
} from 'sequelize-typescript';
import { CityEnum } from './user.global';
import { UserRequest } from './userRequest.entity';
import { Identification } from './identification.entity';

@Table({ timestamps: true })
export class User extends Model {
  @Index
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  userId: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  lastname: string;

  @Column(DataType.STRING)
  fullName: string;

  @Column(DataType.STRING)
  password: string;

  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.DATE)
  dateOfBirth: Date;

  @Default(false)
  @Column(DataType.INTEGER)
  canLogin: boolean;

  @Column(DataType.ENUM(...Object.values(CityEnum)))
  city: CityEnum;

  @HasMany(() => UserRequest)
  userRequests: UserRequest[];

  @HasMany(() => Identification)
  identification: Identification[];

  @BeforeCreate
  static addFullName(userInstance: User) {
    const { name, lastname } = userInstance;
    userInstance.name = name[0].toUpperCase() + name.substring(1).toLowerCase();
    userInstance.lastname =
      lastname[0].toUpperCase() + lastname.substring(1).toLowerCase();
    userInstance.fullName = userInstance.name + ' ' + userInstance.lastname;
  }

  @AfterCreate
  static async generateRequest(userInstance: User) {
    console.log('dsadsasadas', userInstance.toJSON());
  }
}
