import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  VirtualColumn,
} from 'typeorm';
import { NeedUrgency, Status } from 'src/database/donation';
import Category from 'src/database/donation/category/category.entity';
import NeedSafe from 'src/database/donation/needSafe/needSafe.entity';
import Donation from 'src/database/donation/donation/donation.entity';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';

abstract class ChildNeedRelations {
  @OneToMany(() => NeedSafe, (needSafe) => needSafe.childNeed)
  needSafes: NeedSafe[];

  @OneToMany((type) => Donation, (donation) => donation.childNeed)
  donations: Donation[];

  // @ManyToOne(() => Category, (category) => category.needs)
  // category: Category;

  @ManyToOne(() => NeedGroup, (needGroup) => needGroup.needs)
  group: NeedGroup;
}

@Entity()
export default class ChildNeed extends ChildNeedRelations {
  @PrimaryGeneratedColumn()
  needId: number;

  @Column('varchar')
  title: string;

  @Column('integer')
  price: number;

  @Column('integer')
  amount: number;

  @Column('integer', { nullable: true })
  startAmount: number;

  @Column('enum', { default: Status.ACTIVE, enum: Status })
  status: Status;

  @Column('boolean', { default: false })
  isDeleted: boolean;

  @Column('enum', { default: NeedUrgency.NORMAL, enum: NeedUrgency })
  urgency: NeedUrgency;

  // `SELECT COUNT("name") FROM "employees" WHERE "companyName" = ${alias}.name`
  @VirtualColumn({
    type: 'varchar',
    query: (alias: string) =>
      'SELECT SUM(IFNULL(amount,0)) FROM donation WHERE childNeed = ' +
      `${alias}.needId`,
  })
  totals: string;

  @BeforeInsert()
  private async setStartAmount() {
    this.startAmount = this.amount;
  }
}
