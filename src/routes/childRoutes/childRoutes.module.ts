import { Module } from '@nestjs/common';
import ChildAccountRouteModule from 'src/routes/childRoutes/account/child.route.account.module';

@Module({
  imports: [ChildAccountRouteModule],
})
export default class ChildRoutesModule {}
