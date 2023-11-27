import { Entity, Column, OneToMany } from 'typeorm';
import { CityEnum } from 'src/database/user';
import BaseUser from 'src/database/user/baseUser';
import UserRequest from 'src/database/user/userRequest.entity';
import SponsorShipRequest from 'src/database/sponsor/entities/sponsorShipRequest';

@Entity()
export default class Authority extends BaseUser {
  @Column('date')
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: CityEnum })
  city: CityEnum;

  @OneToMany(() => UserRequest, (userRequest) => userRequest.authority)
  userRequests: UserRequest[];

  /*@OneToMany(
    () => SponsorShipRequest,
    (sponsorshipRequest) => sponsorshipRequest.authority,
  )
  sponsorShipRequests: SponsorShipRequest[];*/
}
