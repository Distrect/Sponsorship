import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig, IMailConfig } from './types';

@Injectable()
export class GlobalConfigService {
  constructor(private configService: ConfigService) {}

  public getDatabaseConfig(): IDatabaseConfig {
    const options = {
      database: this.configService.get<string>('DATABASE'),
      dialect: this.configService.get<string>('DIALECT'),
      host: this.configService.get<string>('HOST'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: this.configService.get<number>('PORT'),
    };
    return options;
  }

  public getMailConfig(): IMailConfig {
    return {
      mail: this.configService.get<string>('MAIL'),
      password: this.configService.get<string>('PASSWORD'),
    };
  }
}
