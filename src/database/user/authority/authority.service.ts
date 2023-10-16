import { Table, Model } from 'sequelize-typescript';
import { Injectable, Inject } from '@nestjs/common';
import { Authority } from './authority.entity';

Injectable();
export class AuthorityEntityService {
  constructor(
    @Inject('AUTHORITY_PROVIDER') private authorityRepository: typeof Authority,
  ) {}

  public async getAuthority(data: Partial<Omit<Authority, keyof Model>>) {
    return await this.authorityRepository.findOne({
      where: { ...data },
      raw: true,
      nest: true,
    });
  }
}
