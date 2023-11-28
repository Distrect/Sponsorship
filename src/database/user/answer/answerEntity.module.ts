import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import Answer from 'src/database/user/answer/answer.entity';
import { QuestionEntityModule } from 'src/database/user/question/questionEntity.module';
import AnswerDao from 'src/database/user/answer/answer.dao';

const AnswerProvider = createRepositoryProvider(Answer);

@Module({
  imports: [DatabaseModule, QuestionEntityModule],
  providers: [AnswerProvider, AnswerDao],
  exports: [AnswerDao],
})
export class AnswerEntityModule {}
