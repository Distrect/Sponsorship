import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SponsorShipPayment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column('double')
  paymentAmount: number;

  @Column('integer')
  monthCount: number;
}
