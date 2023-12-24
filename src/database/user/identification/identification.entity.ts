import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import User from '../user/user.entity';
import { ActorType, NationalityEnum } from 'src/database/user';
// import UserCredentialDocuments from './userCredentialDocs.entity';
import { IsUrl, Length } from 'class-validator';
import Child from 'src/database/user/child/child.entity';

@Entity()
export default class Identification {
  @Index()
  @PrimaryGeneratedColumn()
  identificationId: number;

  @Length(10, 11)
  @Column('varchar')
  idNumber: string;

  @Column('enum', { enum: NationalityEnum })
  nationality: NationalityEnum;

  @Column('enum', { enum: ActorType })
  actorType: ActorType;

  @IsUrl()
  @Column('varchar', { default: 'www.x.com' })
  frontPath: string;

  @IsUrl()
  @Column('varchar', { default: 'www.x.com' })
  backPath: string;

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
