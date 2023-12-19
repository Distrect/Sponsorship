import { Module } from '@nestjs/common';
import ChildAccountRouteController from 'src/routes/childRoutes/account/child.route.account.controller';
import ChildAccountRouteService from 'src/routes/childRoutes/account/child.route.account.service';

@Module({
  providers: [ChildAccountRouteService],
  controllers: [ChildAccountRouteController],
})
export default class ChildAccountRouteModule {}
