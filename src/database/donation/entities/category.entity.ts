import ChildNeed from 'src/database/donation/dao/childNeed/childNeed.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column('varchar')
  categoryName: string;

  @OneToMany(() => ChildNeed, (childNeed) => childNeed.category)
  needs: ChildNeed[];

  private iconPath: string;
}
