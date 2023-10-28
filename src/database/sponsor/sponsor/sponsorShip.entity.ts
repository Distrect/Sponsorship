import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
} from 'typeorm';
import { SponsorshipStatus } from '..';
import Child from '../../user/child/child.entity';
import User from '../../user/user.entity';

@Entity()
export default class SponsorShip {
  @Index()
  @PrimaryGeneratedColumn()
  sponsorShipId: number;

  @Column('enum', {
    default: SponsorshipStatus.WAITING_FOR_AUTHORIZATION,
    enum: SponsorshipStatus,
  })
  status: SponsorshipStatus;

  @ManyToOne(() => Child, (child) => child.sponsors)
  child: Child;

  @ManyToOne(() => User, (user) => user.sponsor)
  user: User;
}
