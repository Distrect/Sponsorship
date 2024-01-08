import { Module, forwardRef } from '@nestjs/common';
import BusinnessLogicModule from 'src/modules/businnes.logic.module';
import UserRequestController from 'src/routes/authorityRoutes/userRequest/userRequest.controller';
import UserRequestRouteService from 'src/routes/authorityRoutes/userRequest/userRequest.route.service';

@Module({
  imports: [forwardRef(() => BusinnessLogicModule)],
  providers: [UserRequestRouteService],
  controllers: [UserRequestController],
})
export default class UserRequestRouteModule {}
