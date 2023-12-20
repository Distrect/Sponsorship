import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import QuestionDao from 'src/database/user/question/question.dao';
import Question from 'src/database/user/question/question.entity';
import EntityModule from 'src/database/main/entity.module';

const QuestionProvider = createRepositoryProvider(Question);

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [QuestionProvider, QuestionDao],
  exports: [QuestionDao],
})
export default class QuestionEntityModule {}
