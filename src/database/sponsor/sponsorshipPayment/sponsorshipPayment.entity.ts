import Sponsorship from 'src/database/sponsor/sponsorship/sponsorship.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';

@Entity()
export default class SponsorShipPayment {
  @Index()
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column('double')
  paymentAmount: number;

  @ManyToOne(() => Sponsorship, (sp) => sp.payment)
  sponsorship: Sponsorship;
}
