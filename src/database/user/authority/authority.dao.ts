import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import Authority from './authority.entity';
import { Repository, FindOptionsWhere } from 'typeorm';

Injectable();
export default class AuthorityDao {
  constructor(
    @Injector(Authority) private authorityRepository: Repository<Authority>,
  ) {}

  private async saveAuthortiyEntity(entity: Authority) {
    return await this.authorityRepository.save(entity);
  }

  public async getAuthority(data: FindOptionsWhere<Authority>) {
    return await this.authorityRepository.findOne({ where: { ...data } });
  }
}
