import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { NeedUrgency, Status } from 'src/database/donation';
import Category from 'src/database/donation/category/category.entity';
import NeedSafe from 'src/database/donation/needSafe/needSafe.entity';
import Donation from 'src/database/donation/donation/donation.entity';
import ChildNeedGroup from 'src/database/donation/needGroup/needGroup.entity';

@Entity()
export default class ChildNeed {
  @PrimaryGeneratedColumn()
  needId: number;

  @Column('varchar')
  title: string;

  @Column('integer')
  price: number;

  @Column('integer')
  amount: number;

  @Column('integer')
  startAmount: number;

  @Column('enum', { default: Status.ACTIVE, enum: Status })
  status: Status;

  @Column('boolean', { default: false })
  isDeleted: boolean;

  @Column('enum', { default: NeedUrgency.NORMAL, enum: NeedUrgency })
  urgency: NeedUrgency;

  @OneToMany(() => NeedSafe, (needSafe) => needSafe.childNeed)
  needSafes: NeedSafe[];

  @OneToMany(() => Donation, (donation) => donation.childNeed)
  donations: Donation[];

  @ManyToOne(() => Category, (category) => category.needs)
  category: Category;

  @ManyToOne(() => ChildNeedGroup, (childNeedGroup) => childNeedGroup.needs)
  group: ChildNeedGroup;
}
