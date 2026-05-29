import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryService } from './services/createCategory.service';
import { GetAllCategoriesService } from './services/getAllCategories.service';
import { GetCategoryByIdService } from './services/getCategoryById.service';
import { UpdateCategoryService } from './services/updateCategory.service';
import { DeleteCategoryService } from './services/deleteCategory.service';

@Module({
    controllers: [CategoriesController],
    providers: [CategoriesService, CreateCategoryService, GetAllCategoriesService, GetCategoryByIdService, UpdateCategoryService, DeleteCategoryService],
    exports: [GetAllCategoriesService, GetCategoryByIdService],
})
export class CategoriesModule {}
