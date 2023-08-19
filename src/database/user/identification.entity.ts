import { DataTypes } from 'sequelize';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';

enum NationalityEnum {
  TC = 'TC',
  KKTC = 'KKTC',
}

enum ActorType {
  USER = 'User',
  CHILD = 'Child',
}

export class Identification {
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  identificationId: number;

  @Column(DataTypes.STRING)
  idNumber: string;

  @Column(DataTypes.ENUM(...Object.values(NationalityEnum)))
  nationality: NationalityEnum;

  @Column(DataTypes.ENUM(...Object.values(ActorType)))
  actorType: ActorType;
}
