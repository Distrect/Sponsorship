import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  Column,
} from 'typeorm';
import { SponsorshipStatus } from 'src/database/sponsor';
import User from 'src/database/user/user/user.entity';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import SponsorShipPayment from 'src/database/sponsor/sponsorshipPayment/sponsorshipPayment.entity';

@Entity()
export default class Sponsorship {
  @Index()
  @PrimaryGeneratedColumn()
  sponsorshipId: number;

  @Column('enum', {
    default: SponsorshipStatus.WAITING_FOR_AUTHORIZATION,
    enum: SponsorshipStatus,
  })
  status: SponsorshipStatus;

  @ManyToOne(() => User, (user) => user.sponsor)
  user: User;

  @OneToOne(() => FixNeed, (fixNeed) => fixNeed.sponsorship)
  @JoinColumn()
  fixNeed: FixNeed;

  @OneToMany(() => SponsorShipPayment, (sPayment) => sPayment.sponsorship)
  payment: SponsorShipPayment[];
}
