import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { FixNeedStatus } from 'src/database/sponsor';
import Child from 'src/database/user/child/child.entity';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';

@Entity()
export default class FixNeed {
  @PrimaryGeneratedColumn()
  fixNeedId: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  explanation: string;

  // @Column('varchar')
  // amount: number;

  @Column('boolean', { default: false })
  isDeleted: boolean;

  @Column('varchar')
  category: string;

  @Column('enum', { enum: FixNeedStatus })
  status: FixNeedStatus;

  @OneToOne(() => Sponsorship, (sponsorship) => sponsorship.fixNeed)
  sponsorship: Sponsorship;

  @ManyToOne(() => Child, (child) => child.fixNeeds)
  child: Child;
}
