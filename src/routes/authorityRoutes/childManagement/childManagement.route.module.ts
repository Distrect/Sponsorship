import { Module, forwardRef } from '@nestjs/common';
import BusinnessLogicModule from 'src/modules/businnes.logic.module';
import ChildManagementRouteController from 'src/routes/authorityRoutes/childManagement/childManagement.route.controller';
import ChildManagementRouteService from 'src/routes/authorityRoutes/childManagement/childManagement.route.service';

@Module({
  imports: [forwardRef(() => BusinnessLogicModule)],
  controllers: [ChildManagementRouteController],
  providers: [ChildManagementRouteService],
})
export default class ChildManagementRouteModule {}
