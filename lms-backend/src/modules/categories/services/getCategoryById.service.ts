import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CategoryResponseDto } from '../dto/response-category.dto';
import { categorySelect } from 'src/common/selects/category.select';

@Injectable()
export class GetCategoryByIdService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<CategoryResponseDto> {
        const category = await this.prisma.category.findUnique({
            where: { id },
            select: categorySelect,
        });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }
}
