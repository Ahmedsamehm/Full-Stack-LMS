import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, Query, ParseUUIDPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { AdminOnly } from '../../common/decorators/role.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @AdminOnly()
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Category created successfully')
    create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto);
    }

    @Get()
    @Public()
    @ResponseMessage('Categories retrieved successfully')
    findAll(@Query() pagination: PaginationDto, @Query('name') name?: string, @Query('slug') slug?: string) {
        return this.categoriesService.findAll(pagination, name, slug);
    }

    @Get(':id')
    @Public()
    @ResponseMessage('Category retrieved successfully')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriesService.findOne(id);
    }

    @Patch(':id')
    @AdminOnly()
    @ResponseMessage('Category updated successfully')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCategoryDto) {
        return this.categoriesService.update(id, dto);
    }

    @Delete(':id')
    @AdminOnly()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Category deleted successfully')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriesService.remove(id);
    }
}
