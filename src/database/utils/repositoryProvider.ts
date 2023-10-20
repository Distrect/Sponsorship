import { DataSource } from 'typeorm';
import { generateName } from 'src/database/utils/util';
import { Provider, Inject } from '@nestjs/common';

export const createRepositoryProvider = (entity: any): Provider => ({
  provide: generateName(entity),
  useFactory: async (dataSource: DataSource) =>
    dataSource.getRepository(entity),
  inject: ['SPONSORSHIP'],
});

export const Injector = (entity: any) => Inject(generateName(entity));
