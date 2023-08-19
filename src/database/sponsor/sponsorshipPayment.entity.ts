import { DataTypes } from 'sequelize';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ timestamps: true })
export class SponsorShipPayment {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  paymentId: number;

  @Column(DataTypes.DOUBLE)
  paymentAmount: number;

  @Column(DataTypes.INTEGER)
  monthCount: number;
}
