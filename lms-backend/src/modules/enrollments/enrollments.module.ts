import { Module } from '@nestjs/common';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
import { EnrollService } from './services/enroll.service';
import { EnrollByPaymentService } from './services/enrollByPayment.service';
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
        EnrollService,
        EnrollByPaymentService,
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
