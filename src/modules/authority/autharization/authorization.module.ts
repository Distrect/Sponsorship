import { Module } from '@nestjs/common';
import { AuthorityEntityModule } from 'src/database/user/authority/authority.module';
import { AuthorityAuthorizationController } from 'src/modules/authority/autharization/authorization.controller';
import { AuthorityAuthorizationService } from 'src/modules/authority/autharization/authorization.service';
import { AuthModule } from 'src/services/auth/auth.module';

@Module({
  imports: [AuthorityEntityModule, AuthModule],
  providers: [AuthorityAuthorizationService],
  controllers: [AuthorityAuthorizationController],
})
export class AuthorityAuthorizationModule {}
