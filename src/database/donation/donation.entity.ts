import { DataTypes } from 'sequelize';
import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ timestamps: true })
export class Donation extends Model {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  donationId: number;

  @Column(DataTypes.DOUBLE)
  amount: number;
}
