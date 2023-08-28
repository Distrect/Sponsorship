import {
  Column,
  Default,
  DataType,
  Table,
  Index,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Child } from '../user/child.entity';
import { User } from '../user/user.entity';

export enum SponsorshipStatus {
  APPROVED = 'Approved',
  DENIED = 'Denied',
  WAITING_FOR_PAYMENT = 'Waiting for Payment',
  WAITING_FOR_AUTHORIZATION = 'Waiting for Authorization',
}

@Table({ timestamps: true })
export class SponsorShip extends Model {
  @Index
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  sponsorShipId: number;

  @ForeignKey(() => Child)
  childId: number;

  @BelongsTo(() => Child)
  child: Child;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User[];

  @Default(SponsorshipStatus.WAITING_FOR_AUTHORIZATION)
  @Column(DataType.ENUM(...Object.values(SponsorshipStatus)))
  status: string;
}
