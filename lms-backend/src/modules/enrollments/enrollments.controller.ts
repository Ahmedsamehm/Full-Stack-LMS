import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentByTeacherDto } from './dto/create-enrollment-by-teacher.dto';
import { CreateEnrollmentByAdminDto } from './dto/create-enrollment-by-admin.dto';
import { UpdateEnrollmentStatusDto } from './dto/update-enrollment-status.dto';
import { CompleteLessonDto } from './dto/complete-lesson.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { StudentOnly, TeacherOnly, AdminOnly } from 'src/common/decorators/role.decorator';

@Controller('enrollments')
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) {}

    @Post('free/:courseId')
    @StudentOnly()
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Enrolled in course successfully')
    enrollFree(@Param('courseId', ParseUUIDPipe) courseId: string, @CurrentUser() user: any) {
        return this.enrollmentsService.enrollFree(user.id, courseId);
    }

    @Post('by-teacher')
    @TeacherOnly()
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Student enrolled successfully')
    enrollByTeacher(@Body() dto: CreateEnrollmentByTeacherDto, @CurrentUser() user: any) {
        return this.enrollmentsService.enrollByTeacher(dto, user.id);
    }

    @Post('by-admin')
    @AdminOnly()
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Student enrolled successfully')
    enrollByAdmin(@Body() dto: CreateEnrollmentByAdminDto) {
        return this.enrollmentsService.enrollByAdmin(dto);
    }

    @Post('by-payment')
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Enrolled after payment successfully')
    enrollByPayment(@Body('userId') userId: string, @Body('courseId') courseId: string) {
        return this.enrollmentsService.enrollByPayment(userId, courseId);
    }

    @Get('me')
    @StudentOnly()
    @ResponseMessage('Enrollments retrieved successfully')
    findMyEnrollments(@CurrentUser() user: any, @Query() pagination: PaginationDto) {
        return this.enrollmentsService.findMyEnrollments(user.id, pagination);
    }

    @Get('course/:courseId')
    @TeacherOnly()
    @ResponseMessage('Course enrollments retrieved successfully')
    findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string, @CurrentUser() user: any, @Query() pagination: PaginationDto) {
        return this.enrollmentsService.findByCourse(courseId, user.id, pagination);
    }

    @Get()
    @AdminOnly()
    @ResponseMessage('All enrollments retrieved successfully')
    findAll(@Query() pagination: PaginationDto) {
        return this.enrollmentsService.findAll(pagination);
    }

    @Get(':id')
    @StudentOnly()
    @ResponseMessage('Enrollment retrieved successfully')
    findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any) {
        return this.enrollmentsService.findOne(id, user.id);
    }

    @Patch(':id/status')
    @AdminOnly()
    @ResponseMessage('Enrollment status updated successfully')
    updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateEnrollmentStatusDto) {
        return this.enrollmentsService.updateStatus(id, dto.status);
    }

    @Patch(':id/complete-lesson')
    @StudentOnly()
    @ResponseMessage('Lesson completed successfully')
    completeLesson(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CompleteLessonDto, @CurrentUser() user: any) {
        return this.enrollmentsService.completeLesson(id, dto.lessonId, user.id);
    }

    @Delete(':id')
    @AdminOnly()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Enrollment removed successfully')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.enrollmentsService.remove(id);
    }
}
