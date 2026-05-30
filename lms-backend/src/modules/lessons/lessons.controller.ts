import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ReorderLessonsDto } from './dto/reorder-lesson.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TeacherOnly } from 'src/common/decorators/role.decorator';
import { UserResponseDto } from 'src/core/auth/dto/response-auth.dto';

@Controller('courses/:courseId/lessons')
export class LessonsController {
    constructor(private readonly lessonsService: LessonsService) {}

    @Post()
    @TeacherOnly()
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Lesson created successfully')
    create(@Param('courseId', ParseUUIDPipe) courseId: string, @Body() dto: CreateLessonDto, @CurrentUser() user: UserResponseDto) {
        return this.lessonsService.create(courseId, dto, user.id, user.role);
    }

    @Get()
    @TeacherOnly()
    @ResponseMessage('Lessons retrieved successfully')
    findAll(@Param('courseId', ParseUUIDPipe) courseId: string, @CurrentUser() user: UserResponseDto) {
        return this.lessonsService.findAll(courseId, user.id, user.role);
    }

    @Get(':id')
    @TeacherOnly()
    @ResponseMessage('Lesson retrieved successfully')
    findOne(@Param('courseId', ParseUUIDPipe) courseId: string, @Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: UserResponseDto) {
        return this.lessonsService.findOne(courseId, id, user.id, user.role);
    }

    @Patch(':id')
    @TeacherOnly()
    @ResponseMessage('Lesson updated successfully')
    update(@Param('courseId', ParseUUIDPipe) courseId: string, @Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateLessonDto, @CurrentUser() user: UserResponseDto) {
        return this.lessonsService.update(courseId, id, dto, user.id, user.role);
    }

    @Delete(':id')
    @TeacherOnly()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Lesson deleted successfully')
    remove(@Param('courseId', ParseUUIDPipe) courseId: string, @Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: UserResponseDto) {
        return this.lessonsService.remove(courseId, id, user.id, user.role);
    }

    @Patch('reorder')
    @TeacherOnly()
    @ResponseMessage('Lessons reordered successfully')
    reorder(@Param('courseId', ParseUUIDPipe) courseId: string, @Body() dto: ReorderLessonsDto, @CurrentUser() user: UserResponseDto) {
        return this.lessonsService.reorder(courseId, dto.lessons, user.id, user.role);
    }
}
