import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { GlobalConfigService } from 'src/services/config/config.service';
import { DataSource } from 'typeorm';
import {
  User,
  Child,
  Authority,
  Admin,
  Donation,
  ChildNeed,
  UserRequest,
  Identification,
  UserCredentialDocuments,
  ChildStatus,
  SponsorShip,
  SponsorShipRequest,
  FixNeed,
} from '../index';
import * as path from 'path';

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
      console.log(path.join(__dirname, '..', '/**', '/*.entity.ts'));
      const databaseOptions = configService.getDatabaseConfig();
      const Database = new DataSource({
        ...databaseOptions,
        entities: [path.join(__dirname, '..', '/../**/*.entity.ts')],
      });
      const InitializedDatabase = await Database.initialize();
      return new Promise((res) => res(InitializedDatabase));
    },
    inject: [GlobalConfigService],
  },
];

// const User1 = new User({
//   name: 'sAmEt',
//   lastname: 'Sarıçiçek',
//   email: 'sametsie34@gmail.com',
//   password: 'dsadsadsadsa',
// });
/*
      const u = await sequelize.getRepository(User).create(
        {
          name: 'sAmEt',
          lastname: 'Sarıçiçek',
          email: 'sametsie34@gmail.com',
          password: 'dsadsadsadsa',
        },
        {},
      );
*/
/* const r = await sequelize
        .getRepository(UserRequest)
        .create({ type: 'Sign In' });

      await u.$add('requests', [r]);*/

/*

 {
    provide: 'SEQUELIZE',
    useFactory: async (configService: GlobalConfigService) => {
      const databaseOptions = configService.getDatabaseConfig();
      const sequelize = new Sequelize({
        ...(databaseOptions as SequelizeOptions),
      });
      sequelize.addModels([
        User,
        Admin,
        Child,
        FixNeed,
        Donation,
        ChildNeed,
        Authority,
        SponsorShip,
        UserRequest,
        ChildStatus,
        Identification,
        SponsorShipRequest,
        UserCredentialDocuments,
      ]);
      await sequelize.sync({
        force: true,
        alter: true,
        hooks: true,
        logging: false,
      });

      return sequelize;
    },
    inject: [GlobalConfigService],
  },
      */
