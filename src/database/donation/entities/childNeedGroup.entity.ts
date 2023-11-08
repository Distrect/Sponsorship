import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChildNeedGroupStatus } from 'src/database/donation/entities';
import ChildNeed from 'src/database/donation/entities/childNeed.entity';

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
}
