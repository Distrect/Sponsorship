import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import CategoryDao from 'src/database/donation/category/category.dao';
import Category from 'src/database/donation/category/category.entity';
import DatabaseModule from 'src/database/main/database.module';
import EntityModule from 'src/database/main/entity.module';

const CategoryProvider = createRepositoryProvider(Category);

@Module({
  imports: [/*DatabaseModule*/ forwardRef(() => EntityModule)],
  providers: [CategoryProvider, CategoryDao],
  exports: [CategoryDao],
})
export default class CategoryEntityModule {}
