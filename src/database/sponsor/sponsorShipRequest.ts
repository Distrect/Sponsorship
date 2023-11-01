import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SponsorshipStatus } from 'src/database/sponsor';
import Authority from '../user/authority/authority.entity';
import Admin from '../user/admin.entity';

@Entity()
export default class SponsorShipRequest {
  @PrimaryGeneratedColumn()
  sponsorShipRequestId: number;

  @Column('enum', { default: SponsorshipStatus.WAITING_FOR_AUTHORIZATION })
  status: SponsorshipStatus;

  @Column('text', { nullable: true })
  reason: string;

  @Column('text', { nullable: true })
  approveMessage: string;

  @Column('text', { nullable: true })
  denyMessage: string;

  /* @ManyToOne(() => Authority, (authority) => authority.sponsorShipRequests)
  authority: Authority;*/

  // @ManyToOne(() => Admin, (admin) => admin.sponsorshipRequests)
  admin: Admin;

  @Column('boolean', { default: false })
  adminResponse: boolean;

  @Column('boolean', { default: false })
  authorityResponse: boolean;
}
