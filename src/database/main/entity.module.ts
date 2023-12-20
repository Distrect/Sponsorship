import { Module, forwardRef } from '@nestjs/common';
import CategoryEntityModule from 'src/database/donation/category/category.module';
import ChildNeedEntityModule from 'src/database/donation/childNeed/childNeedEntity.module';
import DonationEntityModule from 'src/database/donation/donation/donationEntityModule.module';
import NeedGroupEntityModule from 'src/database/donation/needGroup/needGroupEntity.module';
import NeedSafeEntityModule from 'src/database/donation/needSafe/needSafeEntity.module';
import SafeEntityModule from 'src/database/donation/safe/safeEntity.module';
import DatabaseModule from 'src/database/main/database.module';
import FixNeedEntityModule from 'src/database/sponsor/fixNeed/fixNeedEntity.module';
import SponsorshipEntityModule from 'src/database/sponsor/sponsorship/sponsorshipEntity.module';
import SponsorshipPaymentEntityModule from 'src/database/sponsor/sponsorshipPayment/sponsorshipPaymentEntity.module';
import AdminEntityModule from 'src/database/user/admin/adminEntity.module';
import AnswerEntityModule from 'src/database/user/answer/answerEntity.module';
import AuthorityEntityModule from 'src/database/user/authority/authority.module';
import ChildEntityModule from 'src/database/user/child/child.module';
import ChildStatusEntityModule from 'src/database/user/childStatus/childStatusEntityModule.module';
import IdentificationEntityModule from 'src/database/user/identification/identification.module';
import QuestionEntityModule from 'src/database/user/question/questionEntity.module';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import UserRequestEntityModule from 'src/database/user/userRequest/userRequestEntity.module';

const AllModules = [
  DatabaseModule,
  UserRequestEntityModule,
  UserEntityModule,
  ChildEntityModule,
  AuthorityEntityModule,
  ChildEntityModule,
  NeedGroupEntityModule,
  ChildNeedEntityModule,
  SponsorshipEntityModule,
  CategoryEntityModule,
  DonationEntityModule,
  NeedSafeEntityModule,
  SafeEntityModule,
  FixNeedEntityModule,
  SponsorshipPaymentEntityModule,
  AdminEntityModule,
  AnswerEntityModule,
  ChildStatusEntityModule,
  IdentificationEntityModule,
  QuestionEntityModule,
];

@Module({
  imports: AllModules,
  exports: AllModules,
})
export default class EntityModule {}
/*
import { Module,  '@nestjs/common';
import CategoryEntityModule from 'src/database/donation/category/category.module';
import ChildNeedEntityModule from 'src/database/donation/childNeed/childNeedEntity.module';
import DonationEntityModule from 'src/database/donation/donation/donationEntityModule.module';
import NeedGroupEntityModule from 'src/database/donation/needGroup/needGroupEntity.module';
import NeedSafeEntityModule from 'src/database/donation/needSafe/needSafeEntity.module';
import SafeEntityModule from 'src/database/donation/safe/safeEntity.module';
import DatabaseModule from 'src/database/main/database.module';
import FixNeedEntityModule from 'src/database/sponsor/fixNeed/fixNeedEntity.module';
import SponsorshipEntityModule from 'src/database/sponsor/sponsorship/sponsorshipEntity.module';
import SponsorshipPaymentEntityModule from 'src/database/sponsor/sponsorshipPayment/sponsorshipPaymentEntity.module';
import AdminEntityModule from 'src/database/user/admin/adminEntity.module';
import AnswerEntityModule from 'src/database/user/answer/answerEntity.module';
import AuthorityEntityModule from 'src/database/user/authority/authority.module';
import ChildEntityModule from 'src/database/user/child/child.module';
import ChildStatusEntityModule from 'src/database/user/childStatus/childStatusEntityModule.module';
import IdentificationEntityModule from 'src/database/user/identification/identification.module';
import QuestionEntityModule from 'src/database/user/question/questionEntity.module';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import UserRequestEntityModule from 'src/database/user/userRequest/userRequestEntity.module';

@Module({
  imports: [
    DatabaseModule,
    UserEntityModule),
    ChildEntityModule),
    AuthorityEntityModule),
    ChildEntityModule),
    NeedGroupEntityModule),
    ChildNeedEntityModule),
    SponsorshipEntityModule),
    CategoryEntityModule),
    DonationEntityModule),
    NeedSafeEntityModule),
    SafeEntityModule),
    FixNeedEntityModule),
    SponsorshipPaymentEntityModule),
    AdminEntityModule),
    AnswerEntityModule),
    ChildStatusEntityModule),
    IdentificationEntityModule),
    QuestionEntityModule),
  ],
})
export default class EntityModule {}

*/
