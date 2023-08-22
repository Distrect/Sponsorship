import { Model, Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { GlobalConfigService } from 'src/services/config/config.service';
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
} from '../index';

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
      sequelize.addModels([
        User,
        Admin,
        Child,
        Donation,
        Authority,
        ChildNeed,
        UserRequest,
        ChildStatus,
        Identification,
        UserCredentialDocuments,
      ]);
      await sequelize.sync({ force: true, alter: true, hooks: true });

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

      return sequelize;
    },
    inject: [GlobalConfigService],
  },
];
