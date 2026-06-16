import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { OptionalAuth } from 'src/common/decorators/optional-auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TeacherOnly, AdminOnly, StudentOnly } from 'src/common/decorators/role.decorator';
import { UserResponseDto } from 'src/core/auth/dto/response-auth.dto';
import { CourseQueryDto } from './dto/course-query.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    @TeacherOnly()
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Course created successfully')
    create(@Body() dto: CreateCourseDto, @CurrentUser() user: UserResponseDto) {
        return this.coursesService.create(dto, user.id);
    }

    @Get()
    @OptionalAuth()
    @ResponseMessage('Courses retrieved successfully')
    findAll(@Query() query: CourseQueryDto, @CurrentUser() user: UserResponseDto) {
        const { categoryId, search, teacherId, status, ...pagination } = query;
        return this.coursesService.findAll(pagination, categoryId, search, teacherId, user?.role, user?.id, status);
    }

    @Get('me')
    @StudentOnly()
    @ResponseMessage('Your courses retrieved successfully')
    findMyCourses(@CurrentUser() user: UserResponseDto, @Query() pagination: PaginationDto) {
        return this.coursesService.findMyCourses(user.id, pagination, user.role);
    }

    @Get('teacher/:teacherId')
    @AdminOnly()
    @ResponseMessage('Teacher courses retrieved successfully')
    findByTeacher(@Param('teacherId', ParseUUIDPipe) teacherId: string, @Query() pagination: PaginationDto) {
        return this.coursesService.findByTeacher(teacherId, pagination);
    }

    @Get(':id')
    @OptionalAuth()
    @ResponseMessage('Course retrieved successfully')
    findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: UserResponseDto) {
        return this.coursesService.findOneWithAuth(id, user?.id, user?.role);
    }

    @Patch(':id')
    @TeacherOnly()
    @ResponseMessage('Course updated successfully')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCourseDto, @CurrentUser() user: UserResponseDto) {
        return this.coursesService.update(id, dto, user.id, user.role);
    }

    @Delete(':id')
    @TeacherOnly()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Course deleted successfully')
    remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: UserResponseDto) {
        return this.coursesService.remove(id, user.id, user.role);
    }

    /**
     * @deprecated The status field is now accepted directly via PATCH /courses/:id
     * This route is kept for backwards compatibility.
     */
    @Patch(':id/status')
    @TeacherOnly()
    @ResponseMessage('Course status updated successfully')
    changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCourseDto, @CurrentUser() user: UserResponseDto) {
        return this.coursesService.update(id, dto, user.id, user.role);
    }
}
