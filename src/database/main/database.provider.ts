import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { GlobalConfigService } from 'src/services/config.service';
import { User, Child, Authority, Admin, Donation, ChildNeed } from '../index';

export interface DatabaseOption {
  dialect: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: GlobalConfigService) => {
      const databaseOptions = configService.getDatabaseConfig();
      const sequelize = new Sequelize({
        ...(databaseOptions as SequelizeOptions),
      });
      sequelize.addModels([User, Child, Authority, Admin, Donation, ChildNeed]);
      await sequelize.sync({ force: true, alter: true, hooks: true });
      return sequelize;
    },
    inject: [GlobalConfigService],
  },
];
