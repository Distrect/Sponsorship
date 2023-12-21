import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';
import User from 'src/database/user/user/user.entity';

@Entity()
export default class Donation {
  @PrimaryGeneratedColumn()
  donationId: number;

  @Column('double', { default: 0 })
  amount: number;

  @ManyToOne(() => ChildNeed, (childNeed) => childNeed.donations)
  childNeed: ChildNeed;

  @ManyToOne(() => User, (user) => user.donations)
  user: User;
}
