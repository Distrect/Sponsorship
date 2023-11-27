import Child from 'src/database/user/child/child.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export default class Safe {
  @PrimaryGeneratedColumn()
  safeId: number;

  @Column('double', { default: 0 })
  totalMoney: number;

  @OneToOne(() => Child, (child) => child.safe)
  child: Child;
}
