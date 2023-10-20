import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Child from './child/child.entity';

@Entity()
export default class ChildStatus {
  @PrimaryGeneratedColumn()
  statusId: number;

  @Column('text')
  text: string;

  @ManyToOne(() => Child, (child) => child.status)
  child: Child;
}
