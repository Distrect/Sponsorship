import { DataSource } from 'typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Child from 'src/database/user/child/child.entity';
import ChildDao from 'src/database/user/child/child.dao';
import DatabaseModule from 'src/database/main/database.module';

const ChildProvider = createRepositoryProvider(Child);

@Module({
  imports: [forwardRef(() => DatabaseModule) /*DatabaseModule*/],
  providers: [ChildProvider, ChildDao],
  exports: [ChildDao],
})
export default class ChildEntityModule {}
