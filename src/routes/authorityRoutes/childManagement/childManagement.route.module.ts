import { Module } from '@nestjs/common';
import ChildModule from 'src/modules/userModule/childModule/child.module';
import ChildManagementRouteController from 'src/routes/authorityRoutes/childManagement/childManagement.route.controller';
import ChildManagementRouteService from 'src/routes/authorityRoutes/childManagement/childManagement.route.service';

@Module({
  imports: [ChildModule],
  controllers: [ChildManagementRouteController],
  providers: [ChildManagementRouteService],
})
export default class ChildManagementRouteModule {}
