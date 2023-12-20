import { Module } from '@nestjs/common';
import AuthorityAccountRouteModule from 'src/routes/authorityRoutes/account/auhority.account.route.module';
import AuthorityRouteService from 'src/routes/authorityRoutes/account/authority.account.route.service';
import AuthorityController from 'src/routes/authorityRoutes/authority.controller';
import ChildManagementRouteModule from 'src/routes/authorityRoutes/childManagement/childManagement.route.module';
import NeedManagementRouteModule from 'src/routes/authorityRoutes/needManagement/needManagement.route.module';
import UserRequestRouteModule from 'src/routes/authorityRoutes/userRequest/userRequest.route.module';

@Module({
  imports: [
    AuthorityAccountRouteModule,
    UserRequestRouteModule,
    NeedManagementRouteModule,
    ChildManagementRouteModule,
  ],
  controllers: [AuthorityController],
  providers: [AuthorityRouteService],
})
export default class AuthorityRouteModule {}
