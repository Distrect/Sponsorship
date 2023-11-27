import { Module } from '@nestjs/common';
import CategoryDao from 'src/database/donation/entities/category/category.dao';
import Category from 'src/database/donation/entities/category/category.entity';
import DatabaseModule from 'src/database/main/database.module';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

const CategoryProvider = createRepositoryProvider(Category);

@Module({
  imports: [DatabaseModule],
  providers: [CategoryProvider, CategoryDao],
  exports: [CategoryDao],
})
export default class CategoryEntityModule {}
