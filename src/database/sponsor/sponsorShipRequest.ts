import { ModelAttributeColumnOptions } from 'sequelize';
import { Authority } from '../user/authority/authority.entity';
import { Admin } from '../user/admin.entity';
import {
  AllowNull,
  Column,
  Default,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { SponsorshipStatus } from '.';

@Table({ timestamps: true })
export class SponsorShipRequest extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  } as ModelAttributeColumnOptions)
  sponsorShipRequestId: number;

  @Default(SponsorshipStatus.WAITING_FOR_AUTHORIZATION)
  @Column(DataType.ENUM(...Object.values(SponsorshipStatus)))
  status: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  approveMessage: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  denyMessage: string;

  @ForeignKey(() => Authority)
  authorityId: number;

  @BelongsTo(() => Authority)
  authority: Authority;

  @ForeignKey(() => Admin)
  adminId: number;

  @BelongsTo(() => Admin)
  admin: Admin;

  @Default(false)
  @Column(DataType.BOOLEAN)
  adminResponse: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  authorityResponse: boolean;
}
