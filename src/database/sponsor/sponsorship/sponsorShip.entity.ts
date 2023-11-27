import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { SponsorshipStatus } from '../..';
import Child from '../../../user/child/child.entity';
import User from '../../../user/sponsor/user.entity';
import FixNeed from 'src/database/sponsor/dao/fixNeed/fixNeed.entity';

@Entity()
export default class Sponsorship {
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

  @OneToOne(() => FixNeed, (fixNeed) => fixNeed.sponsorship)
  fixNeed: FixNeed;
}
