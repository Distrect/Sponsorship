import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import Child from '../../../user/child/child.entity';
import { FixNeedStatus } from 'src/database/sponsor';
import Sponsorship from 'src/database/sponsor/dao/sponsorship/sponsorship.entity';

@Entity()
export default class FixNeed {
  @PrimaryGeneratedColumn()
  fixNeedId: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  explanation: string;

  @Column('varchar')
  amount: number;

  @Column('varchar')
  category: string;

  @Column('enum', { enum: FixNeedStatus })
  status: FixNeedStatus;

  @OneToOne(() => Sponsorship, (sponsorship) => sponsorship.fixNeed)
  sponsorship: Sponsorship;

  @ManyToOne(() => Child, (child) => child.fixNeeds)
  child: Child;
}
