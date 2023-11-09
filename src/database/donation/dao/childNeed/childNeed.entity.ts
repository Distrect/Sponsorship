import { Status } from '../../entities/donation.global';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Category from 'src/database/donation/entities/category.entity';
import ChildNeedGroup from 'src/database/donation/dao/childNeedGroup/childNeedGroup.entity';
import NeedSafe from 'src/database/donation/dao/needSafe/needSafe.entity';
import Donation from 'src/database/donation/entities/donation.entity';

@Entity()
export default class ChildNeed {
  @PrimaryGeneratedColumn()
  needId: number;

  needGroupId: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;

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

  @OneToMany(() => NeedSafe, (needSafe) => needSafe.childNeed)
  needSafes: NeedSafe[];

  @OneToMany(() => Donation, (donation) => donation.childNeed)
  donations: Donation[];

  @ManyToOne(() => Category, (category) => category.needs)
  category: Category;

  @ManyToOne(() => ChildNeedGroup, (childNeedGroup) => childNeedGroup.needs)
  group: ChildNeedGroup;
}
