import { Module } from '@nestjs/common';
import { AuthorityEntityModule } from 'src/database/user/authority/authority.module';
import { AuthorityAuthorizationService } from 'src/modules/authority/autharization/authorization.service';

@Module({
  imports: [AuthorityEntityModule],
  providers: [AuthorityAuthorizationService],
})
export class AuthorityAuthorizationModule {}
