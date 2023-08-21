import { DataTypes } from 'sequelize';
import { Column, Table, PrimaryKey, Default } from 'sequelize-typescript';
/*
enum NeedGroupStatus {
  OPEN = true,
  CLOSE = false,
}*/

@Table({ timestamps: true })
export class ChildNeedGroup {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  needGroupId: number;

  @Default(false)
  @Column(DataTypes.BOOLEAN)
  status: boolean;

  @Column(DataTypes.TEXT)
  explanation: string;
}
