import { Module } from '@nestjs/common';
import AuthorityRouteController from 'src/routes/authorityRoutes/account/authority.account.route.controller';
import AuthorityAccountService from 'src/routes/authorityRoutes/account/authority.account.route.service';

@Module({
  providers: [AuthorityAccountService],
  controllers: [AuthorityRouteController],
})
export default class AuthorityAccountRouteModule {}
