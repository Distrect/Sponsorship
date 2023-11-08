import { NeedSafeType } from 'src/database/donation';
import ChildNeed from 'src/database/donation/entities/childNeed.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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
}
