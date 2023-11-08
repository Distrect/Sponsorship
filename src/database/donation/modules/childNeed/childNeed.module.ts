import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import ChildNeed from 'src/database/donation/entities/childNeed.entity';
import DatabaseModule from 'src/database/main/database.module';
import ChildNeedController from 'src/database/donation/modules/childNeed/childNeed.controller';
import ChildNeedService from 'src/database/donation/modules/childNeed/childNeed.service';
import ChildEntityModule from 'src/database/user/child/child.module';
import ChildNeedDao from 'src/database/donation/dao/childNeed.dao';
import ChildNeedGroup from 'src/database/donation/entities/childNeedGroup.entity';
import SafeModule from 'src/database/donation/modules/safe/safe.module';

const ChildNeedProvider = createRepositoryProvider(ChildNeed);
const ChildNeedGroupProvider = createRepositoryProvider(ChildNeedGroup);

@Module({
  imports: [DatabaseModule, ChildEntityModule, SafeModule],
  providers: [
    ChildNeedProvider,
    ChildNeedGroupProvider,
    ChildNeedService,
    ChildNeedDao,
  ],
  controllers: [ChildNeedController],
})
export default class ChildNeedModule {}
