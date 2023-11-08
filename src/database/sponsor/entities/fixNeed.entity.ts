import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Child from '../../user/child/child.entity';

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

  @Column('varchar')
  status: boolean;

  @ManyToOne(() => Child, (child) => child.fixNeeds)
  child: Child;
}
