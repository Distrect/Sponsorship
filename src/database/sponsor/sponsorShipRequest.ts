import {
  AllowNull,
  Column,
  Default,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ timestamps: true })
export class SponsorShipRequest {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  sponsorShipRequestId: number;

  @Default(false)
  @Column(DataTypes.INTEGER)
  isApproved: boolean;

  @AllowNull(true)
  @Column(DataTypes.TEXT)
  approveMessage: string;

  @AllowNull(true)
  @Column(DataTypes.TEXT)
  denyMessage: string;
}
