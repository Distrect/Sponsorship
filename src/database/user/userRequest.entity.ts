import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Status, Type } from 'src/database/user';

//Tabloya kimin hangi cevabı verdiğini ve onaymı yok redmi açıklaması konulmalıdır

@Entity()
export default class UserRequest {
  @Index()
  @PrimaryGeneratedColumn()
  requestId: number;

  @Column('enum')
  type: Type;

  @Column({ type: 'enum', default: Status.WAITING })
  status: Status;

  @Column('text', { nullable: true })
  adminMessage: string;

  @Column('text', { nullable: true })
  authorityMessage: string;
  /*
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Admin)
  @Column
  adminId: number;

  @BelongsTo(() => Admin)
  admin: Admin;

  @ForeignKey(() => Authority)
  @Column
  authorityId: number;

  @BelongsTo(() => Authority)
  authority: Authority;*/
}

/*import {
  DataType,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Index,
  Table,
  Model,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Admin } from './admin.entity';
import { Authority } from './authority/authority.entity';*/
/*
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
  user: User;

  @ForeignKey(() => Admin)
  @Column
  adminId: number;

  @BelongsTo(() => Admin)
  admin: Admin;

  @ForeignKey(() => Authority)
  @Column
  authorityId: number;

  @BelongsTo(() => Authority)
  authority: Authority;
}
*/
