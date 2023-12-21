import { GlobalConfigService } from 'src/services/config/config.service';
import { DataSource, DeepPartial } from 'typeorm';
import MockDataGenerator from 'src/database/main/mock.data';
import UserRequest from 'src/database/user/userRequest/userRequest.entity';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';
import { SponsorshipStatus } from 'src/database/sponsor';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';

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
        const [authority, childs, users] = await Promise.all([
          managerSave(mockDataGenerator.generateMockAuthority()),
          managerSave(
            mockDataGenerator.multiplier(
              () => mockDataGenerator.generateMockChild(),
              { count: 100 },
            ),
          ),
          managerSave(
            mockDataGenerator.multiplier(
              () => mockDataGenerator.generateMockUser(),
              { count: 20 },
            ),
          ),
        ]);

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
        const sposnsoships: DeepPartial<Sponsorship>[] = [];

        let i = 0;

        for (const child of childs) {
          const user = users[i];

          const needGroup = await managerSave(
            mockDataGenerator.generateNeedGroup(),
          );
          const childNeeds = await managerSave(
            mockDataGenerator.generator(20, 'ChildNeed', { group: needGroup }),
          );

          const fixNeeds = await managerSave(
            mockDataGenerator.generator(5, 'FixNeed', { child }),
          );

          sposnsoships.push(
            ...fixNeeds.map((fixNeed, i) =>
              mockDataGenerator.generateSponsorship({
                fixNeed,
                user: users[i],
                status: SponsorshipStatus.APPROVED,
              }),
            ),
          );

          /*const sponsorship = await managerSave(
            mockDataGenerator.generateSponsorship({
              fixNeed: fixNeeds[0],
              status: SponsorshipStatus.APPROVED,
              user,
            }),
          );*/

          child.fixNeeds = [...fixNeeds];

          needGroup.needs = [...childNeeds];
          needGroup.child = child;
          const newInstnace = InitializedDatabase.manager.create(
            NeedGroup,
            needGroup,
          );
          needGroups.push(newInstnace);
          i++;
        }

        const x = await Promise.all([
          managerSave(needGroups),
          managerSave(sposnsoships),
        ]);
      };

      isDevMode && (await devOps());

      return new Promise((res) => res(InitializedDatabase));
    },
    inject: [GlobalConfigService],
  },
];
