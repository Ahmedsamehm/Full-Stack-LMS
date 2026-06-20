import { Injectable } from '@nestjs/common';
import { EnrollmentStatus } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { EnrollmentQueryDto } from './dto/enrollment-query.dto';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollService } from './services/enroll.service';
import { EnrollByPaymentService } from './services/enrollByPayment.service';
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
        private readonly enrollService: EnrollService,
        private readonly enrollByPaymentService: EnrollByPaymentService,
        private readonly getMyEnrollmentsService: GetMyEnrollmentsService,
        private readonly getEnrollmentByIdService: GetEnrollmentByIdService,
        private readonly getEnrollmentsByCourseService: GetEnrollmentsByCourseService,
        private readonly getAllEnrollmentsService: GetAllEnrollmentsService,
        private readonly updateEnrollmentStatusService: UpdateEnrollmentStatusService,
        private readonly completeLessonService: CompleteLessonService,
        private readonly removeEnrollmentService: RemoveEnrollmentService,
    ) {}

    enroll(dto: CreateEnrollmentDto, currentUser: { id: string; role: any }) {
        return this.enrollService.enroll(dto, currentUser);
    }

    enrollByPayment(userId: string, courseId: string) {
        return this.enrollByPaymentService.enroll(userId, courseId);
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
