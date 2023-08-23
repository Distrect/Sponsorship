import {
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  DataType,
  Model,
} from 'sequelize-typescript';
import { Child } from '../user/child.entity';

@Table({ timestamps: true })
export class FixNeed extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  fixNeedId: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  explanation: string;

  @Column(DataType.DOUBLE)
  amount: number;

  @Column(DataType.STRING)
  category: string;

  @Column(DataType.BOOLEAN)
  status: boolean;

  @ForeignKey(() => Child)
  childId: number;

  @BelongsTo(() => Child)
  child: Child;
}
