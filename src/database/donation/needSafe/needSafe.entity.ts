import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { NeedSafeType } from 'src/database/donation';
import ChildNeed from 'src/database/donation/entities/childNeed/childNeed.entity';

@Entity()
export default class NeedSafe {
  @PrimaryGeneratedColumn()
  needSafeId: number;

  @Column('enum', { enum: NeedSafeType })
  type: NeedSafeType;

  @Column('double')
  amount: number;

  @ManyToOne(() => ChildNeed, (childNeed) => childNeed.needSafes)
  childNeed: ChildNeed;

  @BeforeInsert()
  private chcek() {
    if (this.amount < 0) {
      throw new Error('Bro POlease');
    }
  }
}
