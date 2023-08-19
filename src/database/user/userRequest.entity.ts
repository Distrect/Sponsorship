import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  Default,
  Index,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';

enum Type {
  SIGNIN = 'Sign In',
}

enum Status {
  APPROVED = 'Approved',
  DENIED = 'Denied',
  WAITING = 'Waiting',
}

@Table({ timestamps: true })
export class UserRequest {
  @Index
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  requestId: number;

  @Column(DataTypes.ENUM(...Object.values(Type)))
  type: Type;

  @Default(Status.WAITING)
  @Column(DataTypes.ENUM(...Object.values(Status)))
  status: Status;

  @Column(DataTypes.TEXT)
  adminMessage: string;

  @Column(DataTypes.TEXT)
  authorityMessage: string;

  @BelongsTo(() => User)
  user: User[];
}
