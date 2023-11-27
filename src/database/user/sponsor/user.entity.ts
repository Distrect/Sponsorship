import { Entity, Column, OneToMany } from 'typeorm';
import { CityEnum } from 'src/database/user';
import BaseUser from 'src/database/user/baseUser';
import UserRequest from 'src/database/user/userRequest.entity';
import Identification from 'src/database/user/identification/identification.entity';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';

@Entity()
export default class User extends BaseUser {
  @Column('date')
  dateOfBirth: Date;

  @Column('boolean', { default: false })
  canLogin: boolean;

  @Column('enum', { enum: CityEnum })
  city: CityEnum;

  @OneToMany(() => UserRequest, (userRequest) => userRequest.user)
  userRequests: UserRequest[];

  @OneToMany(() => Identification, (identification) => identification.user)
  identifications: Identification[];

  @OneToMany(() => Sponsorship, (sponsorship) => sponsorship.user)
  sponsor: Sponsorship[];
}
