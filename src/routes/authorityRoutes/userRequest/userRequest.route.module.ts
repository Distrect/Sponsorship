import {
  Module,
  NestModule,
  MiddlewareConsumer,
  forwardRef,
} from '@nestjs/common';
import { Role } from 'src/database/user';
import { CookieMiddlewareMixin } from 'src/middlewares/cookie/cookie.middleware';
import BusinnessLogicModule from 'src/modules/businnes.logic.module';
import UserRequestController from 'src/routes/authorityRoutes/userRequest/userRequest.controller';
import UserRequestRouteService from 'src/routes/authorityRoutes/userRequest/userRequest.route.service';

@Module({
  imports: [forwardRef(() => BusinnessLogicModule)],
  providers: [UserRequestRouteService],
  controllers: [UserRequestController],
})
export default class UserRequestRouteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieMiddlewareMixin(Role.Authority))
      .forRoutes('authority/request/*');
  }
}
