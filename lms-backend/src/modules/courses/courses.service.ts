import { Injectable } from '@nestjs/common';
import { CourseStatus, Roles } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseService } from './services/createCourse.service';
import { GetAllPublishedCoursesService } from './services/getAllPublishedCourses.service';
import { GetMyCoursesService } from './services/getMyCourses.service';
import { GetCourseByIdService } from './services/getCourseById.service';
import { GetCoursesByTeacherService } from './services/getCoursesByTeacher.service';
import { UpdateCourseService } from './services/updateCourse.service';
import { DeleteCourseService } from './services/deleteCourse.service';
import { ChangeCourseStatusService } from './services/changeCourseStatus.service';

@Injectable()
export class CoursesService {
    constructor(
        private readonly createCourseService: CreateCourseService,
        private readonly getAllPublishedCoursesService: GetAllPublishedCoursesService,
        private readonly getMyCoursesService: GetMyCoursesService,
        private readonly getCourseByIdService: GetCourseByIdService,
        private readonly getCoursesByTeacherService: GetCoursesByTeacherService,
        private readonly updateCourseService: UpdateCourseService,
        private readonly deleteCourseService: DeleteCourseService,
        private readonly changeCourseStatusService: ChangeCourseStatusService,
    ) {}

    create(dto: CreateCourseDto, teacherId: string) {
        return this.createCourseService.create(dto, teacherId);
    }

    findAll(pagination: PaginationDto, categoryId?: string, search?: string, userRole?: Roles) {
        return this.getAllPublishedCoursesService.findAll(pagination, categoryId, search, userRole);
    }

    findMyCourses(teacherId: string, pagination: PaginationDto) {
        return this.getMyCoursesService.findMyCourses(teacherId, pagination);
    }

    findOne(id: string) {
        return this.getCourseByIdService.findById(id);
    }

    findByTeacher(teacherId: string, pagination: PaginationDto) {
        return this.getCoursesByTeacherService.findByTeacher(teacherId, pagination);
    }

    update(id: string, dto: UpdateCourseDto, teacherId: string) {
        return this.updateCourseService.update(id, dto, teacherId);
    }

    remove(id: string, teacherId: string) {
        return this.deleteCourseService.delete(id, teacherId);
    }

    changeStatus(courseId: string, newStatus: CourseStatus, userId: string, userRole: Roles) {
        return this.changeCourseStatusService.changeStatus(courseId, newStatus, userId, userRole);
    }
}
