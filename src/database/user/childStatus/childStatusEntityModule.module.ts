import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/mysql.connector.module';
import ChildStatusDao from 'src/database/user/childStatus/childStatus.dao';
import ChildStatus from 'src/database/user/childStatus/childStatus.entity';

const ChildStatusProvider = createRepositoryProvider(ChildStatus);

@Module({
  imports: [forwardRef(() => DatabaseModule) /*DatabaseModule*/],
  providers: [ChildStatusProvider, ChildStatusDao],
  exports: [ChildStatusDao],
})
export default class ChildStatusEntityModule {}
