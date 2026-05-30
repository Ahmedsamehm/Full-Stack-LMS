import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { CreateLessonService } from './services/createLesson.service';
import { GetLessonsByCourseService } from './services/getLessonsByCourse.service';
import { GetLessonByIdService } from './services/getLessonById.service';
import { UpdateLessonService } from './services/updateLesson.service';
import { DeleteLessonService } from './services/deleteLesson.service';
import { ReorderLessonsService } from './services/reorderLessons.service';

@Module({
    controllers: [LessonsController],
    providers: [
        LessonsService,
        CreateLessonService,
        GetLessonsByCourseService,
        GetLessonByIdService,
        UpdateLessonService,
        DeleteLessonService,
        ReorderLessonsService,
    ],
    exports: [GetLessonsByCourseService],
})
export class LessonsModule {}
