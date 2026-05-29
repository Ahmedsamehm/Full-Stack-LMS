import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CreateCourseService } from './services/createCourse.service';
import { GetAllPublishedCoursesService } from './services/getAllPublishedCourses.service';
import { GetMyCoursesService } from './services/getMyCourses.service';
import { GetCourseByIdService } from './services/getCourseById.service';
import { GetCoursesByTeacherService } from './services/getCoursesByTeacher.service';
import { UpdateCourseService } from './services/updateCourse.service';
import { DeleteCourseService } from './services/deleteCourse.service';
import { ChangeCourseStatusService } from './services/changeCourseStatus.service';
import { GetCourseEnrollmentsService } from './services/getCourseEnrollments.service';
import { EnrollStudentService } from './services/enrollStudent.service';
import { RemoveStudentService } from './services/removeStudent.service';

@Module({
    controllers: [CoursesController],
    providers: [
        CoursesService,
        CreateCourseService,
        GetAllPublishedCoursesService,
        GetMyCoursesService,
        GetCourseByIdService,
        GetCoursesByTeacherService,
        UpdateCourseService,
        DeleteCourseService,
        ChangeCourseStatusService,
        GetCourseEnrollmentsService,
        EnrollStudentService,
        RemoveStudentService,
    ],
    exports: [GetCourseByIdService],
})
export class CoursesModule {}
