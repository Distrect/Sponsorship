import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/main/database.module';
import UserDao from 'src/database/user/sponsor/user.dao';
import { UserProvider } from 'src/database/user/sponsor/user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UserProvider, UserDao],
  exports: [],
})
export default class UserModule {}
