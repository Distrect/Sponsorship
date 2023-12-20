import { NestFactory } from '@nestjs/core';
import { CustomValidationPipe } from 'src/pipes/validation.pipe';
import SponsorshipApplication from './app.module';
import cookieParser from 'cookie-parser';
const listRoutes = require('express-list-routes');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(SponsorshipApplication);

  app.useGlobalPipes(new CustomValidationPipe());
  app.use(cookieParser());

  await app.listen(4041);

  listRoutes(app.getHttpServer()._events.request._router);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
