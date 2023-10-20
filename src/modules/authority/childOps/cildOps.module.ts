import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { Role } from 'src/database/user';
import ChildEntityModule from 'src/database/user/child/child.module';
import CookieMiddleware from 'src/middlewares/cookie/cookie.middleware';
import ChildOpsService from 'src/modules/authority/childOps/childOps.service';

@Module({
  imports: [ChildEntityModule],
  providers: [ChildOpsService],
})
export default class ChildOpsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieMiddleware.apply(Role.Authority)).forRoutes('*');
  }
}
