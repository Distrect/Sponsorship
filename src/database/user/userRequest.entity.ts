import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Status, Type } from 'src/database/user';
import User from 'src/database/user/sponsor/user.entity';
import Admin from 'src/database/user/admin.entity';
import Authority from 'src/database/user/authority/authority.entity';

//Tabloya kimin hangi cevabı verdiğini ve onaymı yok redmi açıklaması konulmalıdır

@Entity()
export default class UserRequest {
  @Index()
  @PrimaryGeneratedColumn()
  requestId: number;

  @Column('enum', { enum: Type })
  type: Type;

  @Column({ type: 'enum', default: Status.WAITING, enum: Status })
  status: Status;

  @Column('text', { nullable: true })
  adminMessage: string;

  @Column('text', { nullable: true })
  authorityMessage: string;

  @ManyToOne(() => User, (user) => user.userRequests)
  user: User;

  @ManyToOne(() => Admin, (admin) => admin.userRequests)
  admin: Admin;

  @ManyToOne(() => Authority, (authority) => authority.userRequests)
  authority: Authority;
}
