import { Module } from '@nestjs/common';
import AuthorityAccountRouteModule from 'src/routes/authorityRoutes/account/auhority.account.route.module';
import ChildManagementRouteModule from 'src/routes/authorityRoutes/childManagement/childManagement.route.module';
import NeedManagementRouteModule from 'src/routes/authorityRoutes/needManagement/needManagement.route.module';
import UserRequestRouteModule from 'src/routes/authorityRoutes/userRequest/userRequest.route.module';

const AuthorityRoutes = [
  AuthorityAccountRouteModule,
  ChildManagementRouteModule,
  NeedManagementRouteModule,
  UserRequestRouteModule,
];

@Module({
  imports: AuthorityRoutes,
  exports: AuthorityRoutes,
})
export default class AuthorityRoutesModule {}
