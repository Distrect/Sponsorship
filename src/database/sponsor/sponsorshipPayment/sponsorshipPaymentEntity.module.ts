import { Module } from '@nestjs/common';
import DatabaseModule from 'src/database/main/database.module';

@Module({
  imports: [DatabaseModule],
})
export default class SponsorshipPaymentEntityModule {}
