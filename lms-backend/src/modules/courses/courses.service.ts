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

    findAll(pagination: PaginationDto, categoryId?: string, search?: string, teacherId?: string, userRole?: Roles, userId?: string, status?: CourseStatus) {
        return this.getAllPublishedCoursesService.findAll(pagination, categoryId, search, teacherId, userRole, userId, status);
    }

    findMyCourses(teacherId: string, pagination: PaginationDto, userRole?: Roles) {
        return this.getMyCoursesService.findMyCourses(teacherId, pagination, userRole);
    }

    findOne(id: string) {
        return this.getCourseByIdService.findById(id);
    }

    findOneWithAuth(id: string, userId?: string, userRole?: Roles) {
        return this.getCourseByIdService.findByIdWithAuth(id, userId, userRole);
    }

    findByTeacher(teacherId: string, pagination: PaginationDto) {
        return this.getCoursesByTeacherService.findByTeacher(teacherId, pagination);
    }

    update(id: string, dto: UpdateCourseDto, userId: string, userRole?: Roles) {
        return this.updateCourseService.update(id, dto, userId, userRole);
    }

    remove(id: string, userId: string, userRole: Roles) {
        if (userRole === Roles.Super_Admin || userRole === Roles.Admin) {
            return this.deleteCourseService.deleteAsAdmin(id);
        }
        return this.deleteCourseService.delete(id, userId);
    }

    changeStatus(courseId: string, newStatus: CourseStatus, userId: string, userRole: Roles) {
        return this.changeCourseStatusService.changeStatus(courseId, newStatus, userId, userRole);
    }
}
