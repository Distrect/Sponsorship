import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ChildNeedGroupStatus } from 'src/database/donation';
import ChildNeed from 'src/database/donation/entities/childNeed/childNeed.entity';
import Child from 'src/database/user/child/child.entity';

@Entity()
export default class ChildNeedGroup {
  @PrimaryGeneratedColumn()
  needGroupId: number;

  @Column('enum', { enum: ChildNeedGroupStatus })
  status: ChildNeedGroupStatus;

  @Column('text')
  explanation: string;

  @OneToMany(() => ChildNeed, (childNeed) => childNeed.group)
  needs: ChildNeed[];

  @ManyToOne(() => Child, (child) => child.needGroups)
  child: Child;
}
