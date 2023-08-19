import { DataTypes } from 'sequelize';
import { Column, Default, PrimaryKey, Table } from 'sequelize-typescript';

export class SponsorShip {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  sponsorShipId: number;

  @Default(false)
  @Column(DataTypes.INTEGER)
  isApproved: boolean;
}
