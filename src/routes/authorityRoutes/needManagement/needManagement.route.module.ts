import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import ChildNeedModule from 'src/modules/donationModule/childNeed/childNeed.module';
import NeedManagmentRouteController from 'src/routes/authorityRoutes/needManagement/needManagement.route.controller';
import NeedManagementRouteService from 'src/routes/authorityRoutes/needManagement/needManagement.route.service';

@Module({
  imports: [ChildNeedModule],
  providers: [NeedManagementRouteService],
  controllers: [NeedManagmentRouteController],
})
export default class NeedManagementRouteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
