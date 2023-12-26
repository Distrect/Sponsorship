import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from 'src/database/user';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorship.entity';

abstract class MessageEntityRelations {
  @ManyToOne(() => Sponsorship, (sponsorship) => sponsorship.messages)
  sponsorship: Sponsorship;
}

@Entity()
export default class Message extends MessageEntityRelations {
  @PrimaryGeneratedColumn()
  messageId: number;

  @Column('enum', { enum: Role })
  from: Role;

  @Column('enum', { enum: Role })
  to: Role;

  @Column('text')
  message: string;

  @CreateDateColumn()
  date: Date;
}
