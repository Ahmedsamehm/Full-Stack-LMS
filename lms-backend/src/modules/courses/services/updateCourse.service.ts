import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseResponseDto } from '../dto/response-course.dto';
import { courseBaseSelect } from '../../../common/selects/course.select';
import { toCourseResponse } from '../dto/course.mapper';
import { Roles, CourseStatus } from '@prisma/client';

@Injectable()
export class UpdateCourseService {
    constructor(private readonly prisma: PrismaService) {}

    /**
     * Update a course. Handles both field updates and status changes.
     * Teachers can only update their own courses and can only set DRAFT or PENDING status.
     * Admins/Super_Admins can update any course and set any status.
     */
    async update(id: string, dto: UpdateCourseDto, userId: string, userRole?: Roles): Promise<CourseResponseDto> {
        const isAdmin = userRole === Roles.Super_Admin || userRole === Roles.Admin;

        const course = isAdmin ? await this.prisma.course.findUnique({ where: { id } }) : await this.prisma.course.findFirst({ where: { id, teacherId: userId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        // Status-change permission check
        if (dto.status !== undefined) {
            if (!isAdmin) {
                // Teachers may only move their course to DRAFT or PUBLISHED
                const allowedTeacherStatuses: CourseStatus[] = ['DRAFT', 'PUBLISHED'];
                if (!allowedTeacherStatuses.includes(dto.status)) {
                    throw new ForbiddenException(`Teachers can only set course status to DRAFT or PUBLISHED. Use an admin account to set status to ${dto.status}.`);
                }
            }
        }

        if (dto.categoryId) {
            const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
            if (!category) {
                throw new NotFoundException('Category not found');
            }
        }

        const updated = await this.prisma.course.update({
            where: { id },
            data: { ...dto },
            select: courseBaseSelect,
        });

        return toCourseResponse(updated);
    }
}
