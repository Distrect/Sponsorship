import * as path from 'path';
import { generateMockChild } from 'src/database/main/mockData';
import Child from 'src/database/user/child/child.entity';
import { GlobalConfigService } from 'src/services/config/config.service';
import { DataSource } from 'typeorm';

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
    provide: 'SPONSORSHIP',
    useFactory: async (configService: GlobalConfigService) => {
      const databaseOptions = configService.getDatabaseConfig();
      const Database = new DataSource({
        synchronize: true,
        ...databaseOptions,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        // entities: [path.join(__dirname, '..', '/../**/*.entity.ts')],
      });
      const InitializedDatabase = await Database.initialize();

      console.log(__dirname + '/../**/*.entity.{js,ts}');
      const childs = InitializedDatabase.manager.create(
        Child,
        generateMockChild(20),
      );

      await InitializedDatabase.manager.save(childs);

      //const childRepo = InitializedDatabase.getRepository(Child);

      //const childs = await childRepo.create(generateMockChild(20));

      return new Promise((res) => res(InitializedDatabase));
    },
    inject: [GlobalConfigService],
  },
];

// import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

// import {
//   User,
//   Child,
//   Authority,
//   Admin,
//   Donation,
//   ChildNeed,
//   UserRequest,
//   Identification,
//   UserCredentialDocuments,
//   ChildStatus,
//   SponsorShip,
//   SponsorShipRequest,
//   FixNeed,
// } from '../index';

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
