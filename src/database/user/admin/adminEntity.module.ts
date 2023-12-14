import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import AdminDao from 'src/database/user/admin/admin.dao';
import Admin from 'src/database/user/admin/admin.entity';

const AdminProvider = createRepositoryProvider(Admin);

@Module({
  imports: [DatabaseModule],
  providers: [AdminProvider, AdminDao],
  exports: [AdminDao],
})
export default class AdminEntityModule {}
