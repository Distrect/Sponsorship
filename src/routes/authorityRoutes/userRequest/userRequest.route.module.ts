import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { Role } from 'src/database/user';
import { CookieMiddlewareMixin } from 'src/middlewares/cookie/cookie.middleware';
import UserRequestModule from 'src/modules/userModule/userRequest/userRequest.module';
import UserRequestController from 'src/routes/authorityRoutes/userRequest/userRequest.controller';
import UserRequestRouteService from 'src/routes/authorityRoutes/userRequest/userRequest.route.service';

@Module({
  imports: [UserRequestModule],
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
