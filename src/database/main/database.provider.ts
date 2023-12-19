import { GlobalConfigService } from 'src/services/config/config.service';
import { DataSource } from 'typeorm';
import {
  generateMockAuthority,
  generateMockData,
  generateMockIdentification,
  generateMockSponsorship,
  generateNeedGroup,
} from 'src/database/main/mockData';
import User from 'src/database/user/user/user.entity';
import Child from 'src/database/user/child/child.entity';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';
import Identification from 'src/database/user/identification/identification.entity';
import Authority from 'src/database/user/authority/authority.entity';
import UserRequest from 'src/database/user/userRequest/userRequest.entity';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';

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
        migrationsRun: false,
        synchronize: isDevMode,
        dropSchema: isDevMode,
        ...databaseOptions,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        subscribers: [__dirname + '/../**/*.listener.{js,ts}'],
      });
      console.log('DEV MODE WARNING');
      const InitializedDatabase = await Database.initialize();

      const managerSave = <T>(entity: T): Promise<T> =>
        InitializedDatabase.manager.save(entity);

      const devOps = async () => {
        const authority = await managerSave(
          InitializedDatabase.manager.create(
            Authority,
            generateMockAuthority(),
          ),
        );

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

        const userRequestsData = userIds.map((userId) =>
          InitializedDatabase.manager.create(UserRequest, {
            user: { userId },
            authority: { userId: authority.userId },
          }),
        );

        await managerSave(userRequestsData);

        await managerSave(
          InitializedDatabase.manager.create(
            Sponsorship,
            generateMockSponsorship(userIds, childIds),
          ),
        );

        await managerSave(
          InitializedDatabase.manager.create(
            Identification,
            generateMockIdentification(userIds),
          ),
        );

        const childsNeedGroupsfaker = await managerSave(
          generateNeedGroup(childIds).map((needGroup) =>
            InitializedDatabase.manager.create(NeedGroup, needGroup),
          ),
        );
      };

      isDevMode && (await devOps());

      return new Promise((res) => res(InitializedDatabase));
    },
    inject: [GlobalConfigService],
  },
];
