import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { GlobalConfigModule } from './services/config/config.module';
import MailModule from './services/mail/mail.module';
import AuthorityRouteModule from 'src/routes/authorityRoutes/authority.route.module';
import UserModule from 'src/modules/userModule/userModule/user.module';
import ChildRoutesModule from 'src/routes/childRoutes/childRoutes.module';
import UserRequestRouteModule from 'src/routes/authorityRoutes/userRequest/userRequest.route.module';
import FileModule from 'src/services/file/file.module';
import { UserRouteModule } from 'src/routes/userRoutes/user.route.module';

@Module({
  imports: [
    FileModule,
    GlobalConfigModule,
    MailModule,
    UserModule,
    AuthorityRouteModule,
    UserRouteModule,
    ChildRoutesModule,
    // AuthorityAccountRouteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
