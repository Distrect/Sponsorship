import { DataTypes } from 'sequelize';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';

export class Safe {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  safeId: number;

  @Column(DataTypes.DOUBLE)
  totalMoney: number;
}
