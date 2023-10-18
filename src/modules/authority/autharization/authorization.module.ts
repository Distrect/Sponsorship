import { Module } from '@nestjs/common';
import { AuthorityEntityModule } from 'src/database/user/authority/authority.module';
import { AuthorityAuthorizationController } from 'src/modules/authority/autharization/authorization.controller';
import { AuthorityAuthorizationService } from 'src/modules/authority/autharization/authorization.service';

@Module({
  imports: [AuthorityEntityModule],
  providers: [AuthorityAuthorizationService],
  controllers: [AuthorityAuthorizationController],
})
export class AuthorityAuthorizationModule {}
