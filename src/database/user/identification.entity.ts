import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import User from './user.entity';
import UserCredentialDocuments from './userCredentialDocs.entity';
import { Length } from 'sequelize-typescript';
import { NationalityEnum } from 'src/database/user';

enum ActorType {
  USER = 'User',
  CHILD = 'Child',
}

@Entity()
export default class Identification {
  @PrimaryGeneratedColumn()
  identificationId: number;

  @Length({ min: 10, max: 11, msg: '' })
  @Column('string')
  idNumber: string;

  @Column('enum')
  nationality: NationalityEnum;

  @Column('enum')
  actorType: ActorType;

  @ManyToOne(() => User, (user) => user.identifications)
  user: User;

  @HasMany(() => UserCredentialDocuments)
  documents: UserCredentialDocuments[];
}
