import { Module, Global } from '@nestjs/common';
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
import EntityModule from 'src/database/main/entity.module';
import AuthorityAccountRouteModule from 'src/routes/authorityRoutes/account/auhority.account.route.module';
import DatabaseModule from 'src/database/main/database.module';
import { BusinnessLogicModule } from 'src/modules/bussinnes.logic.module';

@Module({
  imports: [
    BusinnessLogicModule,
    GlobalConfigModule,
    FileModule,
    MailModule,
    EntityModule,
    /*AuthorityRouteModule,
    UserRouteModule,
    ChildRoutesModule,
    AuthorityAccountRouteModule,*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
