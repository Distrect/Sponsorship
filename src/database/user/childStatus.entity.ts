import { Child } from './child.entity';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table
export class ChildStatus extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  statusId: number;

  @Column(DataType.TEXT)
  text: string;

  @ForeignKey(() => Child)
  childId: number;

  @BelongsTo(() => Child)
  child: Child;
}
