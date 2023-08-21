import {
  DataType,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { UserCredentialDocuments } from './userCredentialDocs.entity';

enum NationalityEnum {
  TC = 'TC',
  KKTC = 'KKTC',
}

enum ActorType {
  USER = 'User',
  CHILD = 'Child',
}

@Table
export class Identification extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  identificationId: number;

  @Column(DataType.STRING)
  idNumber: string;

  @Column(DataType.ENUM(...Object.values(NationalityEnum)))
  nationality: NationalityEnum;

  @Column(DataType.ENUM(...Object.values(ActorType)))
  actorType: ActorType;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => UserCredentialDocuments)
  documents: UserCredentialDocuments[];
}
