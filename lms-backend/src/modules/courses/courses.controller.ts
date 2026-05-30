import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TeacherOnly, AdminOnly } from 'src/common/decorators/role.decorator';
import { UserResponseDto } from 'src/core/auth/dto/response-auth.dto';

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
    @Public()
    @ResponseMessage('Courses retrieved successfully')
    findAll(@Query() pagination: PaginationDto, @CurrentUser() user: UserResponseDto, @Query('categoryId') categoryId?: string, @Query('search') search?: string) {
        return this.coursesService.findAll(pagination, categoryId, search, user?.role);
    }

    @Get('me')
    @TeacherOnly()
    @ResponseMessage('Your courses retrieved successfully')
    findMyCourses(@CurrentUser() user: UserResponseDto, @Query() pagination: PaginationDto) {
        return this.coursesService.findMyCourses(user.id, pagination);
    }

    @Get('teacher/:teacherId')
    @AdminOnly()
    @ResponseMessage('Teacher courses retrieved successfully')
    findByTeacher(@Param('teacherId', ParseUUIDPipe) teacherId: string, @Query() pagination: PaginationDto) {
        return this.coursesService.findByTeacher(teacherId, pagination);
    }

    @Get(':id')
    @Public()
    @ResponseMessage('Course retrieved successfully')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.coursesService.findOne(id);
    }

    @Patch(':id')
    @TeacherOnly()
    @ResponseMessage('Course updated successfully')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCourseDto, @CurrentUser() user: UserResponseDto) {
        return this.coursesService.update(id, dto, user.id);
    }

    @Delete(':id')
    @TeacherOnly()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Course deleted successfully')
    remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: UserResponseDto) {
        return this.coursesService.remove(id, user.id);
    }

    @Patch(':id/status')
    @TeacherOnly()
    @ResponseMessage('Course status updated successfully')
    changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ChangeStatusDto, @CurrentUser() user: UserResponseDto) {
        return this.coursesService.changeStatus(id, dto.status, user.id, user.role);
    }
}
