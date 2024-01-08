import Sponsorship from 'src/database/sponsor/sponsorship/sponsorship.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';

@Entity()
export default class SponsorshipPayment {
  @Index()
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column('double')
  paymentAmount: number;

  @ManyToOne(() => Sponsorship, (sp) => sp.payment)
  @JoinColumn({ name: 'sponsorship' })
  sponsorship: Sponsorship;

  @CreateDateColumn()
  createdAt: Date;
}
