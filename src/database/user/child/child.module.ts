import { DataSource } from 'typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Child from 'src/database/user/child/child.entity';
import ChildDao from 'src/database/user/child/child.dao';
import DatabaseModule from 'src/database/main/database.module';
import EntityModule from 'src/database/main/entity.module';
/*
const ChildProvider = {
  provide: 'CHILD_REPOSITORY',
  useFactory: async (dataSource: DataSource) => dataSource.getRepository(Child),
  inject: ['SPONSORSHIP'],
};*/

const ChildProvider = createRepositoryProvider(Child);

@Module({
  imports: [forwardRef(() => EntityModule) /*DatabaseModule*/],
  providers: [ChildProvider, ChildDao],
  exports: [ChildDao],
})
export default class ChildEntityModule {}
