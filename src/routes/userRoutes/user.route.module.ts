import { Module } from '@nestjs/common';
import { UserRouteService } from 'src/routes/userRoutes/user.route.service';
import UserRouteController from 'src/routes/userRoutes/user.route.controller';
import UserAccountRouteModule from 'src/routes/userRoutes/account/user.account.route.module';
import ChildInNeedRouteModule from 'src/routes/userRoutes/childInNeed/childInNeed.route.module';
import ChildProfileRouteModule from 'src/routes/userRoutes/childProfile/childProfile.route.module';

const UserRoutes = [
  UserAccountRouteModule,
  ChildInNeedRouteModule,
  ChildProfileRouteModule,
];

@Module({
  imports: UserRoutes,
  controllers: [UserRouteController],
  providers: [UserRouteService],
})
export default class UserRoutesModule {}
