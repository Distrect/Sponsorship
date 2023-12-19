import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import ChildNeedDao from 'src/database/donation/childNeed/childNeed.dao';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';
import DatabaseModule from 'src/database/main/database.module';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import { NeedGroupProvider } from 'src/database/donation/needGroup/needGroupEntity.module';

const ChildNeedProvider = createRepositoryProvider(ChildNeed);

@Module({
  imports: [DatabaseModule, UserEntityModule],
  providers: [ChildNeedProvider, ChildNeedDao],
  exports: [ChildNeedDao],
})
export default class ChildNeedEntityModule {}
