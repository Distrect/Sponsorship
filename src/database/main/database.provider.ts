import { GlobalConfigService } from 'src/services/config/config.service';
import { DataSource, DeepPartial } from 'typeorm';
import MockDataGenerator from 'src/database/main/mock.data';
import UserRequest from 'src/database/user/userRequest/userRequest.entity';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';
import { SponsorshipStatus } from 'src/database/sponsor';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorship.entity';
import Identification from 'src/database/user/identification/identification.entity';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';
import { CLIENT_RENEG_LIMIT } from 'tls';
import Donation from 'src/database/donation/donation/donation.entity';
import Message from 'src/database/sponsor/message/message.entity';

const mainUser = {
  name: 'XXXXXXXXXX',
  lastname: 'YYYYYYY',
  email: 'Xyz@gmail.com',
};

export const databaseProviders = [
  {
    provide: 'SPONSORSHIP',
    useFactory: async (configService: GlobalConfigService) => {
      const isDevMode = configService.getDevMode();
      const databaseOptions = configService.getDatabaseConfig();
      const Database = new DataSource({
        migrationsRun: false,
        synchronize: true || isDevMode,
        dropSchema: isDevMode,
        ...databaseOptions,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        subscribers: [__dirname + '/../**/*.listener.{js,ts}'],
      });
      console.log('DEV MODE WARNING');

      const InitializedDatabase = await Database.initialize();

      console.log(
        'data tables:',
        InitializedDatabase.entityMetadatas.map((metada) => metada.tableName),
      );
      const mockDataGenerator = new MockDataGenerator(InitializedDatabase);

      const create = InitializedDatabase.manager.create;

      const managerSave = <T>(entity: T): Promise<T> =>
        InitializedDatabase.manager.save(entity);

      const devOps = async () => {
        const [authority, childs, users] = await Promise.all([
          managerSave(mockDataGenerator.generateMockAuthority()),
          managerSave(mockDataGenerator.generator(100, 'Child')),
          managerSave([
            mockDataGenerator.generateMockUser(mainUser),
            ...mockDataGenerator.generator(19, 'User'),
          ]),
        ]);

        const needGroups: NeedGroup[] = [];
        const sposnsoships: Sponsorship[] = [];
        const identifications: Identification[] = [];

        let i = 0;

        for (const child of childs) {
          const user = users[i];

          const needGroup = await managerSave(
            mockDataGenerator.generateNeedGroup({ child }),
          );
          const childNeeds = await managerSave(
            mockDataGenerator.generator(20, 'ChildNeed', { group: needGroup }),
          );

          const fixNeeds = await managerSave(
            mockDataGenerator.generator(5, 'FixNeed', { child }),
          );

          const identificationOfChild =
            mockDataGenerator.generateMockIdentification({ child });

          identifications.push(identificationOfChild);

          sposnsoships.push(
            ...fixNeeds.map((fixNeed, i) =>
              mockDataGenerator.generateSponsorship({
                fixNeed,
                user: users[i],
                status: SponsorshipStatus.APPROVED,
              }),
            ),
          );

          child.fixNeeds = [...fixNeeds];
          needGroup.needs = [...childNeeds];
          child.needGroups = [needGroup];

          const newInstnace = InitializedDatabase.manager.create(
            NeedGroup,
            needGroup,
          );
          needGroups.push(newInstnace);
          i++;
        }

        /* const messages = await managerSave(
          mockDataGenerator.generator(20, 'Message', {
            sponsorship: fUfC,
          }),
        );*/
        /*fUfC.messages = [...messages];*/

        const toDonateChildNeed = childs[0].needGroups[0].needs[0];

        const donations: Donation[] = [];

        for (const user of users) {
          const donation = mockDataGenerator.generateMockDonation({
            amount: 5,
            childNeed: toDonateChildNeed,
            user,
          });
          donations.push(donation);
        }

        const [needGroupsRecords, sponsorshipRecords, ...rest] =
          await Promise.all([
            managerSave(needGroups),
            managerSave(sposnsoships),
            managerSave(identifications),
            managerSave(donations),
          ]);

        const fUfC = sponsorshipRecords[0];
        const mockMessages = await managerSave(
          mockDataGenerator.generator(100, 'Message', { sponsorship: fUfC }),
        );

        fUfC.messages = mockMessages;

        const childNeedRepository =
          InitializedDatabase.getRepository(ChildNeed);
        /*
        const z = await childNeedRepository
          .createQueryBuilder('child_need')
          .leftJoinAndSelect('child_need.donations', 'donation')
          .addSelect("SUM(IFNULL('donation.amount',0))", 'totals')
          .where('child_need.needId = 1')
          .getOne();
          console.log(z);
          */

        console.log(
          await childNeedRepository
            .createQueryBuilder('child_need')
            .where('child_need.needId = 2')
            .getOne(),
        );
      };

      isDevMode && (await devOps());

      return new Promise((res) => res(InitializedDatabase));
    },
    inject: [GlobalConfigService],
  },
];
