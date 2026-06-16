import { Injectable } from '@nestjs/common';
import { EnrollmentStatus } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { EnrollmentQueryDto } from './dto/enrollment-query.dto';
import { CreateEnrollmentByTeacherDto } from './dto/create-enrollment-by-teacher.dto';
import { CreateEnrollmentByAdminDto } from './dto/create-enrollment-by-admin.dto';
import { EnrollFreeService } from './services/enrollFree.service';
import { EnrollByPaymentService } from './services/enrollByPayment.service';
import { EnrollByTeacherService } from './services/enrollByTeacher.service';
import { EnrollByAdminService } from './services/enrollByAdmin.service';
import { GetMyEnrollmentsService } from './services/getMyEnrollments.service';
import { GetEnrollmentByIdService } from './services/getEnrollmentById.service';
import { GetEnrollmentsByCourseService } from './services/getEnrollmentsByCourse.service';
import { GetAllEnrollmentsService } from './services/getAllEnrollments.service';
import { UpdateEnrollmentStatusService } from './services/updateEnrollmentStatus.service';
import { CompleteLessonService } from './services/completeLesson.service';
import { RemoveEnrollmentService } from './services/removeEnrollment.service';

@Injectable()
export class EnrollmentsService {
    constructor(
        private readonly enrollFreeService: EnrollFreeService,
        private readonly enrollByPaymentService: EnrollByPaymentService,
        private readonly enrollByTeacherService: EnrollByTeacherService,
        private readonly enrollByAdminService: EnrollByAdminService,
        private readonly getMyEnrollmentsService: GetMyEnrollmentsService,
        private readonly getEnrollmentByIdService: GetEnrollmentByIdService,
        private readonly getEnrollmentsByCourseService: GetEnrollmentsByCourseService,
        private readonly getAllEnrollmentsService: GetAllEnrollmentsService,
        private readonly updateEnrollmentStatusService: UpdateEnrollmentStatusService,
        private readonly completeLessonService: CompleteLessonService,
        private readonly removeEnrollmentService: RemoveEnrollmentService,
    ) {}

    enrollFree(userId: string, courseId: string) {
        return this.enrollFreeService.enroll(userId, courseId);
    }

    enrollByPayment(userId: string, courseId: string) {
        return this.enrollByPaymentService.enroll(userId, courseId);
    }

    enrollByTeacher(dto: CreateEnrollmentByTeacherDto, teacherId: string) {
        return this.enrollByTeacherService.enroll(dto, teacherId);
    }

    enrollByAdmin(dto: CreateEnrollmentByAdminDto) {
        return this.enrollByAdminService.enroll(dto);
    }

    findMyEnrollments(userId: string, pagination: PaginationDto) {
        return this.getMyEnrollmentsService.findByUserId(userId, pagination);
    }

    findOne(id: string, userId: string) {
        return this.getEnrollmentByIdService.findById(id, userId);
    }

    findByCourse(courseId: string, teacherId: string, pagination: PaginationDto) {
        return this.getEnrollmentsByCourseService.findByCourseId(courseId, teacherId, pagination);
    }

    findAll(query: EnrollmentQueryDto) {
        return this.getAllEnrollmentsService.findAll(query);
    }

    updateStatus(id: string, status: EnrollmentStatus) {
        return this.updateEnrollmentStatusService.updateStatus(id, status);
    }

    completeLesson(enrollmentId: string, lessonId: string, userId: string) {
        return this.completeLessonService.completeLesson(enrollmentId, lessonId, userId);
    }

    remove(id: string) {
        return this.removeEnrollmentService.remove(id);
    }
}
