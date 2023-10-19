import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig, IMailConfig, IMailUser } from './types';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class GlobalConfigService {
  constructor(private configService: ConfigService) {}

  public getDatabaseConfig(): DataSourceOptions {
    return {
      // dialect: this.configService.get<string>('DIALECT'),
      type: 'mysql',
      database: this.configService.get<string>('DATABASE'),
      host: this.configService.get<string>('HOST'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: this.configService.get<number>('PORT'),
    };
  }

  public getMailUser(): IMailUser {
    return {
      mail: this.configService.get<string>('MAIL'),
      password: this.configService.get<string>('PASSWORD'),
    };
  }

  public getMailConfig(): IMailConfig {
    return {
      host: this.configService.get<string>('MAIL_SERVICE_HOST'),
      port: this.configService.get<number>('MAIL_SERVICE_PORT'),
    };
  }

  public getAuthKey(): string {
    return this.configService.get<string>('JWT_PRIVATE_KEY');
  }
}
