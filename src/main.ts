import { NestFactory } from '@nestjs/core';
import { CustomValidationPipe } from 'src/pipes/validation.pipe';
import SponsorshipApplication from './app.module';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const listRoutes = require('express-list-routes');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(SponsorshipApplication);

  app.useGlobalPipes(new CustomValidationPipe());
  app.use(cookieParser());
  app.enableCors({ origin: ['http://localhost:5173'], credentials: true });
  // app.use(cors({ origin: 'http:localhost:5173', credentials: true }));

  await app.listen(4041);
  // console.log(await app.getUrl());
  // listRoutes(app.getHttpServer()._events.request._router);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
