import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Child from 'src/database/user/child/child.entity';
import DatabaseModule from 'src/database/main/database.module';
import ChildEntityService from 'src/database/user/child/child.service';

const ChildProvider = createRepositoryProvider(Child);

@Module({
  imports: [DatabaseModule],
  providers: [ChildProvider, ChildProvider, ChildEntityService],
  exports: [ChildEntityService],
})
export default class ChildEntityModule {}
