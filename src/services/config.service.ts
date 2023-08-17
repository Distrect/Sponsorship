import { DatabaseOption } from './../database/main/database.provider';
import { Injectable, Get } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Injectable()
export class GlobalConfigService {
  constructor(private configService: ConfigService) {}

  public getDatabaseConfig(): DatabaseOption {
    const options: DatabaseOption = {
      database: this.configService.get<string>('DATABASE'),
      dialect: this.configService.get<string>('DIALECT'),
      host: this.configService.get<string>('HOST'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: this.configService.get<number>('PORT'),
    };
    return options;
  }
}
