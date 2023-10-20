export const generateName = (entity: any) =>
  (entity.name as string).toLocaleUpperCase('en') + '_REPOSITORY';
