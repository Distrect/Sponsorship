import ChildNeed from 'src/database/donation/dao/childNeed/childNeed.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export default class Donation {
  @PrimaryGeneratedColumn()
  donationId: number;

  @Column('double')
  amount: number;

  @ManyToOne(() => ChildNeed, (childNeed) => childNeed.donations)
  childNeed: ChildNeed;
}
