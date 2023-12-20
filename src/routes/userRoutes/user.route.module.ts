import { Module } from '@nestjs/common';
import { UserRouteService } from 'src/routes/userRoutes/user.route.service';
import UserRouteController from 'src/routes/userRoutes/user.route.controller';
import UserAccountRouteModule from 'src/routes/userRoutes/account/user.account.route.module';

const UserRoutes = [UserAccountRouteModule];

@Module({
  imports: UserRoutes,
  controllers: [UserRouteController],
  providers: [UserRouteService],
})
export default class UserRoutesModule {}
