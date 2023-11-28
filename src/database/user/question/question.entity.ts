import Answer from 'src/database/user/answer/answer.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export default class Question {
  @PrimaryGeneratedColumn()
  quetionId: number;

  @Column('varchar')
  question: string;

  @OneToOne(() => Answer, (answer) => answer.question)
  answer: Answer;
}
