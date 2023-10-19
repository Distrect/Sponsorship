import { Entity, Column } from 'typeorm';
import { CityEnum } from 'src/database/user';
import BaseUser from 'src/database/user/baseUser';

@Entity()
export class Admin extends BaseUser {
  @Column('enum')
  city: CityEnum;
  /*
  @HasMany(() => UserRequest)
  userRequests: UserRequest[];

  @HasMany(() => SponsorShipRequest)
  sponsorShipRequest: SponsorShipRequest[];

 */
}

// import { DataTypes } from 'sequelize';
// import {
//   Table,
//   Column,
//   Model,
//   BeforeCreate,
//   IsEmail,
//   HasMany,
//   Default,
// } from 'sequelize-typescript';
// import { UserRequest } from './userRequest.entity';
// import { SponsorShipRequest } from '../sponsor/sponsorShipRequest';
