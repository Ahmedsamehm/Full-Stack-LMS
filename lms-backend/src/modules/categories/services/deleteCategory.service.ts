import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class DeleteCategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async delete(id: string): Promise<{ message: string }> {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: { _count: { select: { courses: true } } },
        });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        if (category._count.courses > 0) {
            throw new BadRequestException('Cannot delete category with existing courses');
        }

        await this.prisma.category.delete({ where: { id } });

        return { message: 'Category deleted successfully' };
    }
}
