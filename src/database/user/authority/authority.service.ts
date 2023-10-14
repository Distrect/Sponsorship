import { Injectable, Inject } from '@nestjs/common';
import { Authority } from './authority.entity';

Injectable();
export class AuthorityEntityService {
  constructor(
    @Inject('AUTHORITY_PROVIDER') private authorityRepository: typeof Authority,
  ) {}

  public async getAuthority(data: Partial<Authority>) {
    return await this.authorityRepository.findOne({ where: { ...data } });
  }
}
