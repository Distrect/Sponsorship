import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Category from 'src/database/donation/entities/category/category.entity';
import { Injector } from 'src/database/utils/repositoryProvider';

@Injectable()
export default class CategoryDao {
  @Injector(Category) private categoryRepository: Repository<Category>;
}
