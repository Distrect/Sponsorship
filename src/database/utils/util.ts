import { getMetadataArgsStorage } from 'typeorm';

export const checkIfClassIsEntity = <T extends new (...args: any[]) => any>(
  entity: T,
) =>
  !!getMetadataArgsStorage().tables.find((table) => table.name === entity.name);

export const generateName = <T extends new (...args: any[]) => any>(
  entity: T,
) => entity.name.toLocaleUpperCase('en') + '_REPOSITORY';
