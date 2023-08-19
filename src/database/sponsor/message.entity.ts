import { DataTypes } from 'sequelize';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';
import { Col } from 'sequelize/types/utils';

@Table({ timestamps: true })
export class Message {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  messageId: number;

  @Column(DataTypes.TEXT)
  message: string;
}
