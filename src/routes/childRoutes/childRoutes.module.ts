import { Module } from '@nestjs/common';
import ChildAccountRouteModule from 'src/routes/childRoutes/account/child.route.account.module';

const ChildRoutes = [ChildAccountRouteModule];

@Module({
  imports: ChildRoutes,
  exports: ChildRoutes,
})
export default class ChildRoutesModule {}
