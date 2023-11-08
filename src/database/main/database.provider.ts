import { GlobalConfigService } from 'src/services/config/config.service';
import { DataSource } from 'typeorm';
import {
  generateMockData,
  generateMockIdentification,
  generateMockSponsorship,
} from 'src/database/main/mockData';
import User from 'src/database/user/sponsor/user.entity';
import Child from 'src/database/user/child/child.entity';
import SponsorShip from 'src/database/sponsor/entities/sponsorShip.entity';
import Identification from 'src/database/user/identification/identification.entity';
import { ActorType, NationalityEnum } from 'src/database/user';

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
      const isDevMode = configService.getDevMode();
      const databaseOptions = configService.getDatabaseConfig();
      const Database = new DataSource({
        synchronize: isDevMode,
        dropSchema: isDevMode,
        ...databaseOptions,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
      });
      const InitializedDatabase = await Database.initialize();

      const managerSave = <T>(entity: T): Promise<T> =>
        InitializedDatabase.manager.save(entity);

      const devOps = async () => {
        const childs = await managerSave(
          InitializedDatabase.manager.create(
            Child,
            generateMockData(20, 'Child'),
          ),
        );

        const users = await managerSave(
          InitializedDatabase.manager.create(
            User,
            generateMockData(20, 'User'),
          ),
        );

        const userIds = users.map(({ userId }) => userId);
        const childIds = childs.map(({ userId }) => userId);

        await managerSave(
          InitializedDatabase.manager.create(
            SponsorShip,
            generateMockSponsorship(userIds, childIds),
          ),
        );

        await managerSave(
          InitializedDatabase.manager.create(
            Identification,
            generateMockIdentification(userIds),
          ),
        );
      };

      isDevMode && (await devOps());

      return new Promise((res) => res(InitializedDatabase));
    },
    inject: [GlobalConfigService],
  },
];
