import { Module } from '@nestjs/common';
import ChildOpsService from 'src/modules/authority/childOps/childOps.service';

@Module({
  providers: [ChildOpsService],
})
export default class ChildOpsModule {}
