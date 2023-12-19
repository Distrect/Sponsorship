import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Child from 'src/database/user/child/child.entity';
import ChildDao from 'src/database/user/child/child.dao';
import DatabaseModule from 'src/database/main/database.module';

const ChildProvider = {
  provide: 'CHILD_REPOSITORY',
  useFactory: async (dataSource: DataSource) => dataSource.getRepository(Child),
  inject: ['SPONSORSHIP'],
};

/* createRepositoryProvider(Child);*/

@Module({
  providers: [ChildProvider, ChildDao],
  exports: [ChildDao],
})
export default class ChildEntityModule {}
