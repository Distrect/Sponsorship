import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import AdminDao from 'src/database/user/admin/admin.dao';
import Admin from 'src/database/user/admin/admin.entity';
import DatabaseModule from 'src/database/main/entity.module';

const AdminProvider = createRepositoryProvider(Admin);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [AdminProvider, AdminDao],
  exports: [AdminDao],
})
export default class AdminEntityModule {}
