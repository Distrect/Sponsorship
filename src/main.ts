import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from 'src/pipes/validation.pipe';
import cookieParser from 'cookie-parser';
import JwtService from 'src/services/jwt/jwt.service';
import { ValidationPipe } from '@nestjs/common';
const listRoutes = require('express-list-routes');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new CustomValidationPipe());
  app.use(cookieParser());

  await app.listen(4041);
  const list = listRoutes(app.getHttpServer()._events.request._router);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
