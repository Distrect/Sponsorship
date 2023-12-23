import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { Repository } from 'typeorm';
import SponsorShipPayment from 'src/database/sponsor/sponsorshipPayment/sponsorshipPayment.entity';

@Injectable()
export default class SponsorshipPaymnetDAO {
  @Injector(SponsorShipPayment)
  private sponsorshipPaymentRepository: Repository<SponsorShipPayment>;

  private async saveSponsorshipPaymentEntity(entity: SponsorShipPayment) {
    return await this.sponsorshipPaymentRepository.save(entity);
  }

  public async createPaymentRecord(
    sponsorshipId: number,
    paymentAmount: number,
  ) {
    const payment = this.sponsorshipPaymentRepository.create({
      sponsorship: { sponsorshipId },
      paymentAmount,
    });

    return await this.saveSponsorshipPaymentEntity(payment);
  }
}
