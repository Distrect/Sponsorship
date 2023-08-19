import { DataTypes } from 'sequelize';
import { Column, Table, PrimaryKey } from 'sequelize-typescript';

enum NeedSafeType {
  INCOME = 'Income',
  OUTCOME = 'Outcome',
}

@Table({ timestamps: true })
export class NeedSafe {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  needSafeId: number;

  @Column(DataTypes.ENUM(...Object.values(NeedSafeType)))
  type: NeedSafeType;

  @Column(DataTypes.DOUBLE)
  amount: number;
}
