import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Status } from './donation.global';

@Table({ timestamps: true })
export class ChildNeed extends Model {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  userId: number;

  @Column(DataTypes.STRING)
  title: string;

  @Column(DataTypes.STRING)
  descriptiom: string;

  @Column(DataTypes.INTEGER)
  price: number;

  @Column(DataTypes.INTEGER)
  count: number;

  @Column(DataTypes.INTEGER)
  status: Status;
}
