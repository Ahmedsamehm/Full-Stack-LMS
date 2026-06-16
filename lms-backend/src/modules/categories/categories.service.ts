import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCategoryService } from './services/createCategory.service';
import { GetAllCategoriesService } from './services/getAllCategories.service';
import { GetCategoryByIdService } from './services/getCategoryById.service';
import { UpdateCategoryService } from './services/updateCategory.service';
import { DeleteCategoryService } from './services/deleteCategory.service';

@Injectable()
export class CategoriesService {
    constructor(
        private readonly createCategoryService: CreateCategoryService,
        private readonly getAllCategoriesService: GetAllCategoriesService,
        private readonly getCategoryByIdService: GetCategoryByIdService,
        private readonly updateCategoryService: UpdateCategoryService,
        private readonly deleteCategoryService: DeleteCategoryService,
    ) {}

    create(dto: CreateCategoryDto) {
        return this.createCategoryService.create(dto);
    }

    findAll(pagination: PaginationDto, name?: string, slug?: string) {
        return this.getAllCategoriesService.findAll(pagination, name, slug);
    }

    findOne(id: string) {
        return this.getCategoryByIdService.findById(id);
    }

    update(id: string, dto: UpdateCategoryDto) {
        return this.updateCategoryService.update(id, dto);
    }

    remove(id: string) {
        return this.deleteCategoryService.delete(id);
    }
}
