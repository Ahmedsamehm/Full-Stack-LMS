import { Module } from '@nestjs/common';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
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
import { CheckEnrollmentExpirationService } from './services/checkEnrollmentExpiration.service';

@Module({
    controllers: [EnrollmentsController],
    providers: [
        EnrollmentsService,
        EnrollFreeService,
        EnrollByPaymentService,
        EnrollByTeacherService,
        EnrollByAdminService,
        GetMyEnrollmentsService,
        GetEnrollmentByIdService,
        GetEnrollmentsByCourseService,
        GetAllEnrollmentsService,
        UpdateEnrollmentStatusService,
        CompleteLessonService,
        RemoveEnrollmentService,
        CheckEnrollmentExpirationService,
    ],
    exports: [EnrollByPaymentService, CheckEnrollmentExpirationService],
})
export class EnrollmentsModule {}
