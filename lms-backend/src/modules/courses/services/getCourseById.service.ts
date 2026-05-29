import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CourseDetailResponseDto } from '../dto/response-course.dto';

@Injectable()
export class GetCourseByIdService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<CourseDetailResponseDto> {
        const course = await this.prisma.course.findFirst({
            where: { id, status: 'PUBLISHED' },
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                categoryId: true,
                thumbnailUrl: true,
                teacherId: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                category: { select: { id: true, name: true, slug: true } },
                teacher: { select: { id: true, name: true } },
                lessons: {
                    select: { id: true, title: true, duration: true, orderIndex: true },
                    orderBy: { orderIndex: 'asc' },
                },
                _count: { select: { enrollments: true } },
            },
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return course;
    }

    async findByIdForTeacher(id: string, teacherId: string): Promise<CourseDetailResponseDto> {
        const course = await this.prisma.course.findFirst({
            where: { id, teacherId },
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                categoryId: true,
                thumbnailUrl: true,
                teacherId: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                category: { select: { id: true, name: true, slug: true } },
                lessons: {
                    select: { id: true, title: true, duration: true, orderIndex: true },
                    orderBy: { orderIndex: 'asc' },
                },
                _count: { select: { enrollments: true } },
            },
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return course;
    }
}
