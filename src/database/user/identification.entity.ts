import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // OneToMany,
  ManyToOne,
} from 'typeorm';
import User from './user.entity';
import { ActorType, NationalityEnum } from 'src/database/user';
// import UserCredentialDocuments from './userCredentialDocs.entity';
import { IsUrl, Length } from 'class-validator';
import Child from 'src/database/user/child/child.entity';

@Entity()
export default class Identification {
  @PrimaryGeneratedColumn()
  identificationId: number;

  @Length(10, 11)
  @Column('string')
  idNumber: string;

  @Column('enum')
  nationality: NationalityEnum;

  @Column('enum')
  actorType: ActorType;

  @IsUrl()
  @Column('string')
  path: string;

  @ManyToOne(() => User, (user) => user.identifications)
  user: User;

  @ManyToOne(() => Child, (child) => child.identifications)
  child: Child;
  /*
  @OneToMany(
    () => UserCredentialDocuments,
    (userCredentialDocuments) => userCredentialDocuments.identification,
  )
  documents: UserCredentialDocuments[];*/
}
