import { GlobalConfigService } from 'src/services/config/config.service';
import { DataSource } from 'typeorm';
import Authority from 'src/database/user/authority/authority.entity';
import MockDataGenerator from 'src/database/main/mock.data';
import UserRequest from 'src/database/user/userRequest/userRequest.entity';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';

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

      const mockDataGenerator = new MockDataGenerator(InitializedDatabase);

      const create = InitializedDatabase.manager.create;

      const managerSave = <T>(entity: T): Promise<T> =>
        InitializedDatabase.manager.save(entity);

      const devOps = async () => {
        const authority = await managerSave(
          mockDataGenerator.generateMockAuthority(),
        );

        const childs = await managerSave(
          mockDataGenerator.multiplier(
            () => mockDataGenerator.generateMockChild(),
            { count: 20 },
          ),
        );

        const users = await managerSave(
          mockDataGenerator.multiplier(
            () => mockDataGenerator.generateMockUser(),
            { count: 20 },
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

        const identifications = await managerSave(
          users.map((user) => {
            const identification =
              mockDataGenerator.generateMockIdentification();

            user.identifications = [identification];
            return identification;
          }),
        );

        const needGroups: NeedGroup[] = [];

        for (const child of childs) {
          const needGroup = mockDataGenerator.generateNeedGroup();
          const childNeeds = await managerSave(
            mockDataGenerator.multiplier(
              () => mockDataGenerator.generateChildNeed(),
              { count: 20 },
            ),
          );
          needGroup.needs = [...childNeeds];
          needGroup.child = child;
          const newInstnace = InitializedDatabase.manager.create(
            NeedGroup,
            needGroup,
          );
          needGroups.push(newInstnace);
        }

        const createdNeedGroups = await managerSave(needGroups);
      };

      isDevMode && (await devOps());

      return new Promise((res) => res(InitializedDatabase));
    },
    inject: [GlobalConfigService],
  },
];
