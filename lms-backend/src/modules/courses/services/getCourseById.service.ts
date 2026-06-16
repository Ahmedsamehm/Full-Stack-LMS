import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { CourseDetailResponseDto } from '../dto/response-course.dto';
import { courseDetailSelect } from '../../../common/selects/course.select';
import { toCourseDetailResponse } from '../dto/course.mapper';
import { CourseStatus, Roles } from '@prisma/client';

@Injectable()
export class GetCourseByIdService {
    constructor(private readonly prisma: PrismaService) {}

    /** Public endpoint — only returns PUBLISHED courses */
    async findById(id: string): Promise<CourseDetailResponseDto> {
        const course = await this.prisma.course.findFirst({
            where: { id, status: CourseStatus.PUBLISHED },
            select: courseDetailSelect,
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return toCourseDetailResponse(course);
    }

    /**
     * Auth-aware fetch:
     * - Super_Admin / Admin → any course, any status
     * - Teacher              → their own course, any status
     * - null / Student       → only PUBLISHED courses
     */
    async findByIdWithAuth(id: string, userId?: string, userRole?: Roles): Promise<CourseDetailResponseDto> {
        let course: any = null;

        if (userRole === Roles.Super_Admin || userRole === Roles.Admin) {
            course = await this.prisma.course.findUnique({
                where: { id },
                select: courseDetailSelect,
            });
        } else if (userRole === Roles.Teacher && userId) {
            course = await this.prisma.course.findFirst({
                where: { id, teacherId: userId },
                select: courseDetailSelect,
            });
            // Fall back to any published course (teacher might be viewing another's published course)
            if (!course) {
                course = await this.prisma.course.findFirst({
                    where: { id, status: CourseStatus.PUBLISHED },
                    select: courseDetailSelect,
                });
            }
        } else {
            course = await this.prisma.course.findFirst({
                where: { id, status: CourseStatus.PUBLISHED },
                select: courseDetailSelect,
            });
        }

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return toCourseDetailResponse(course);
    }

    async findByIdForTeacher(id: string, teacherId: string): Promise<CourseDetailResponseDto> {
        const course = await this.prisma.course.findFirst({
            where: { id, teacherId },
            select: courseDetailSelect,
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return toCourseDetailResponse(course);
    }
}
