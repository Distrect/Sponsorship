import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Answer from 'src/database/user/answer/answer.entity';
import AnswerDao from 'src/database/user/answer/answer.dao';
import EntityModule from 'src/database/main/entity.module';

const AnswerProvider = createRepositoryProvider(Answer);

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [AnswerProvider, AnswerDao],
  exports: [AnswerDao],
})
export default class AnswerEntityModule {}
