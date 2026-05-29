import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryResponseDto } from '../dto/response-category.dto';

@Injectable()
export class CreateCategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
        const existing = await this.prisma.category.findFirst({
            where: { OR: [{ name: dto.name }, { slug: dto.slug }] },
        });

        if (existing) {
            throw new ConflictException('Category with this name or slug already exists');
        }

        const category = await this.prisma.category.create({
            data: { name: dto.name, slug: dto.slug },
            select: { id: true, name: true, slug: true, createdAt: true, updatedAt: true },
        });

        return category;
    }
}
