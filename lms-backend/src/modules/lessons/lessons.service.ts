import { Injectable } from '@nestjs/common';
import { CourseStatus, Roles } from '@prisma/client';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ReorderLessonItemDto } from './dto/reorder-lesson.dto';
import { CreateLessonService } from './services/createLesson.service';
import { GetLessonsByCourseService } from './services/getLessonsByCourse.service';
import { GetLessonByIdService } from './services/getLessonById.service';
import { UpdateLessonService } from './services/updateLesson.service';
import { DeleteLessonService } from './services/deleteLesson.service';
import { ReorderLessonsService } from './services/reorderLessons.service';

@Injectable()
export class LessonsService {
    constructor(
        private readonly createLessonService: CreateLessonService,
        private readonly getLessonsByCourseService: GetLessonsByCourseService,
        private readonly getLessonByIdService: GetLessonByIdService,
        private readonly updateLessonService: UpdateLessonService,
        private readonly deleteLessonService: DeleteLessonService,
        private readonly reorderLessonsService: ReorderLessonsService,
    ) {}

    create(courseId: string, dto: CreateLessonDto, userId: string, userRole: Roles) {
        return this.createLessonService.create(courseId, dto, userId, userRole);
    }

    findAll(courseId: string, userId: string, userRole: Roles) {
        return this.getLessonsByCourseService.findByCourseId(courseId, userId, userRole);
    }

    findOne(courseId: string, lessonId: string, userId: string, userRole: Roles) {
        return this.getLessonByIdService.findById(courseId, lessonId, userId, userRole);
    }

    update(courseId: string, lessonId: string, dto: UpdateLessonDto, userId: string, userRole: Roles) {
        return this.updateLessonService.update(courseId, lessonId, dto, userId, userRole);
    }

    remove(courseId: string, lessonId: string, userId: string, userRole: Roles) {
        return this.deleteLessonService.delete(courseId, lessonId, userId, userRole);
    }

    reorder(courseId: string, items: ReorderLessonItemDto[], userId: string, userRole: Roles) {
        return this.reorderLessonsService.reorder(courseId, items, userId, userRole);
    }
}
