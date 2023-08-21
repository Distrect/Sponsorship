import {
  DataType,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Index,
  PrimaryKey,
  Table,
  Model,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user.entity';

enum Type {
  SIGNIN = 'Sign In',
}

export enum Status {
  APPROVED = 'Approved',
  DENIED = 'Denied',
  WAITING = 'Waiting',
  BANNED = 'Banned',
}

@Table({ timestamps: true })
export class UserRequest extends Model {
  @Index
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  requestId: number;

  @Column(DataType.ENUM(...Object.values(Type)))
  type: Type;

  @Default(Status.WAITING)
  @Column(DataType.ENUM(...Object.values(Status)))
  status: Status;

  @AllowNull
  @Column(DataType.TEXT)
  adminMessage: string;

  @AllowNull
  @Column(DataType.TEXT)
  authorityMessage: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User[];
}
