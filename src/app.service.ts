import { Injectable } from '@nestjs/common';
import CategoryDao from 'src/database/donation/category/category.dao';
import ChildNeedDao from 'src/database/donation/childNeed/childNeed.dao';
import DonationDao from 'src/database/donation/donation/donation.dao';
import NeedGroupDao from 'src/database/donation/needGroup/needGroup.dao';
import NeedSafeDao from 'src/database/donation/needSafe/needSafe.dao';
import SafeDao from 'src/database/donation/safe/safe.dao';
import FixNeedDao from 'src/database/sponsor/fixNeed/fixNeed.dao';
import SponsorshipDao from 'src/database/sponsor/sponsorship/sponsorShip.dao';
import AdminDao from 'src/database/user/admin/admin.dao';
import AnswerDao from 'src/database/user/answer/answer.dao';
import AuthorityDao from 'src/database/user/authority/authority.dao';
import ChildDao from 'src/database/user/child/child.dao';
import ChildStatusDao from 'src/database/user/childStatus/childStatus.dao';
import IdentificationDao from 'src/database/user/identification/identification.dao';
import QuestionDao from 'src/database/user/question/question.dao';
import UserDao from 'src/database/user/user/user.dao';
import UserRequestDao from 'src/database/user/userRequest/userRequest.dao';

@Injectable()
export class AppService {
  constructor(
    // private sponsorshipPaymentDao: SponsorshipPaymentDao,
    private userRequestDao: UserRequestDao,
    private userDao: UserDao,
    private childDao: ChildDao,
    private authorityDao: AuthorityDao,
    private needGroupDao: NeedGroupDao,
    private childNeedDao: ChildNeedDao,
    private sponsorshipDao: SponsorshipDao,
    private categoryDao: CategoryDao,
    private donationDao: DonationDao,
    private needSafeDao: NeedSafeDao,
    private safeDao: SafeDao,
    private fixNeedDao: FixNeedDao,
    private adminDao: AdminDao,
    private answerDao: AnswerDao,
    private childStatusDao: ChildStatusDao,
    private identificationDao: IdentificationDao,
    private questionDao: QuestionDao,
  ) {}
  async getHello() {
    await console.log(this.userRequestDao);
    await console.log(this.userDao);
    await console.log(this.childDao);
    await console.log(this.authorityDao);
    await console.log(this.needGroupDao);
    await console.log(this.childNeedDao);
    await console.log(this.sponsorshipDao);
    await console.log(this.categoryDao);
    await console.log(this.donationDao);
    await console.log(this.needSafeDao);
    await console.log(this.safeDao);
    await console.log(this.fixNeedDao);
    await console.log(this.adminDao);
    await console.log(this.answerDao);
    await console.log(this.childStatusDao);
    await console.log(this.identificationDao);
    await console.log(this.questionDao);
    await this.needGroupDao.getActiveGroupOfChild(1);
  }
}
