import Sponsorship from 'src/database/sponsor/sponsorship/sponsorship.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export default class SponsorShipPayment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column('double')
  paymentAmount: number;

  @ManyToOne(() => Sponsorship, (sp) => sp.payment)
  sponsorship: Sponsorship;
}
