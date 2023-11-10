import ChildNeed from 'src/database/donation/entities/childNeed/childNeed.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column('varchar')
  categoryName: string;

  @OneToMany(() => ChildNeed, (childNeed) => childNeed.category)
  needs: ChildNeed[];

  @BeforeInsert()
  private fixUppercase() {
    this.categoryName = this.categoryName
      .split(' ')
      .map((word) => word[0].toLocaleUpperCase('tr-TR') + word.substring(1))
      .join(' ');
  }

  //private iconPath: string;
}
