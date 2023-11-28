import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import QuestionDao from 'src/database/user/question/question.dao';
import Question from 'src/database/user/question/question.entity';

const QuestionProvider = createRepositoryProvider(Question);

@Module({
  imports: [DatabaseModule],
  providers: [QuestionProvider, QuestionDao],
  exports: [QuestionDao],
})
export class QuestionEntityModule {}
