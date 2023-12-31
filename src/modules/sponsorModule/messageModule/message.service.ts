import { Injectable } from '@nestjs/common';
import MessageDAO from 'src/database/sponsor/message/message.dao';
import SponsorshipDAO from 'src/database/sponsor/sponsorship/sponsorship.dao';

@Injectable()
export default class MessageService {
  constructor(
    private messageDAO: MessageDAO,
    private sponsorshipDAO: SponsorshipDAO,
  ) {}

  public async checkIfUserSponosrToChild(userId: number, childId: number) {
    const sponosrship = await this.sponsorshipDAO.checkIfUserSponsorToChild(
      userId,
      childId,
    );

    return !!sponosrship;
  }
}
