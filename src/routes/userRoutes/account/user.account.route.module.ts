import { Module } from '@nestjs/common';
import UserAccountRouteController from 'src/routes/userRoutes/account/user.account.route.controller';
import UserAccountRouteService from 'src/routes/userRoutes/account/user.account.route.service';

@Module({
  imports: [],
  providers: [UserAccountRouteService],
  controllers: [UserAccountRouteController],
})
export default class UserAccountRouteModule {}
