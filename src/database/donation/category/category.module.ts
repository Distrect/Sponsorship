import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import CategoryDao from 'src/database/donation/category/category.dao';
import Category from 'src/database/donation/category/category.entity';
import DatabaseModule from 'src/database/main/databasew.module';

const CategoryProvider = createRepositoryProvider(Category);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [CategoryProvider, CategoryDao],
  exports: [CategoryDao],
})
export default class CategoryEntityModule {}
