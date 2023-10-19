import { Entity, Column, OneToMany } from 'typeorm';
import { CityEnum } from 'src/database/user';
import BaseUser from 'src/database/user/baseUser';
import UserRequest from 'src/database/user/userRequest.entity';
import SponsorShipRequest from 'src/database/sponsor/sponsorShipRequest';

@Entity()
export default class Admin extends BaseUser {
  @Column('enum')
  city: CityEnum;

  @OneToMany(() => UserRequest, (userRequest) => userRequest.admin)
  userRequests: UserRequest[];

  @OneToMany(
    () => SponsorShipRequest,
    (sponsorrshipRequest) => sponsorrshipRequest.admin,
  )
  sponsorshipRequests: SponsorShipRequest[];
}
