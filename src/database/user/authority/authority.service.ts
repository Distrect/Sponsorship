import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import Authority from './authority.entity';
import { Repository, FindOptionsWhere } from 'typeorm';

Injectable();
export class AuthorityEntityService {
  constructor(
    @Injector(Authority) private authorityRepository: Repository<Authority>,
  ) {}

  public async getAuthority(data: FindOptionsWhere<Authority>) {
    return await this.authorityRepository.findOne({ where: { ...data } });
    // return await this.authorityRepository.findOne({ where: { ...data } });
  }
}
