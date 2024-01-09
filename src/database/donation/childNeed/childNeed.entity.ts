import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  VirtualColumn,
  Index,
} from 'typeorm';
import { NeedUrgency, Status } from 'src/database/donation';
import NeedSafe from 'src/database/donation/needSafe/needSafe.entity';
import Donation from 'src/database/donation/donation/donation.entity';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';

const totalDonationOfNeed = (alias: string) =>
  'SELECT IFNULL(SUM(IFNULL(NULLIF(amount,""),0)),0) FROM donation WHERE childNeed = ' +
  `${alias}.needId`;

class ChildNeedRelations {
  @OneToMany(() => NeedSafe, (needSafe) => needSafe.childNeed)
  needSafes: NeedSafe[];

  @OneToMany((type) => Donation, (donation) => donation.childNeed)
  donations: Donation[];

  @ManyToOne(() => NeedGroup, (needGroup) => needGroup.needs)
  group: NeedGroup;
}

@Entity()
export default class ChildNeed extends ChildNeedRelations {
  @Index()
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

  /*@VirtualColumn({
    type: 'integer',
    query: (alias: string) => 'SELECT 1',
  })*/
  totals: number;

  @VirtualColumn({
    type: 'integer',
    query(alias: string) {
      const whereAlias = `childNeed = ${alias}.needId`;
      const query =
        `SELECT SUM(IFNULL(amount,0)) FROM donation WHERE ` + whereAlias;

      console.log(
        'Quey',
        'SELECT IFNULL(SUM(IFNULL(NULLIF(amount,""),0)),0) FROM donation WHERE childNeed = ' +
          `${alias}.needId`,
      );

      return `SELECT "donationId"`;
    },
  })
  private deneme: number;

  @BeforeInsert()
  private async setStartAmount() {
    this.startAmount = this.amount;
  }
}
