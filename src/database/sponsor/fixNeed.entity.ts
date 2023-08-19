import { DataTypes } from 'sequelize';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';

export class FixNeed {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  fixNeedId: number;

  @Column(DataTypes.STRING)
  title: string;

  @Column(DataTypes.STRING)
  explanation: string;

  @Column(DataTypes.DOUBLE)
  amount: number;

  @Column(DataTypes.STRING)
  category: string;

  @Column(DataTypes.BOOLEAN)
  status: boolean;
}
