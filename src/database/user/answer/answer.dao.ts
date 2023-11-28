import { Repository, FindOptionsWhere } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { ServerError } from 'src/utils/error';
import Answer from 'src/database/user/answer/answer.entity';
import Question from 'src/database/user/question/question.entity';
import QuestionDao from 'src/database/user/question/question.dao';

@Injectable()
export default class AnswerDao {
  @Injector(Answer) private answerRepository: Repository<Answer>;
  private questionDao: QuestionDao;

  private async saveAnswerEntity(entity: Answer) {
    return await this.answerRepository.save(entity);
  }

  public async createAnswer(
    questionParams: FindOptionsWhere<Question>,
    answerMessage: string,
  ) {
    if (!answerMessage) throw new ServerError('The Answer cannot empty');

    const question = await this.questionDao.getQuestion(questionParams);

    const answer = this.answerRepository.create({
      answer: answerMessage,
      question,
    });

    return await this.saveAnswerEntity(answer);
  }
}
