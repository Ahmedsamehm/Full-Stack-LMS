import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryResponseDto } from '../dto/response-category.dto';

@Injectable()
export class UpdateCategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async update(id: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto> {
        const existing = await this.prisma.category.findUnique({ where: { id } });

        if (!existing) {
            throw new NotFoundException('Category not found');
        }

        if (dto.name || dto.slug) {
            const conflict = await this.prisma.category.findFirst({
                where: {
                    OR: [...(dto.name ? [{ name: dto.name }] : []), ...(dto.slug ? [{ slug: dto.slug }] : [])],
                    NOT: { id },
                },
            });

            if (conflict) {
                throw new ConflictException('Category with this name or slug already exists');
            }
        }

        const category = await this.prisma.category.update({
            where: { id },
            data: { ...dto },
            select: { id: true, name: true, slug: true, createdAt: true, updatedAt: true },
        });

        return category;
    }
}
