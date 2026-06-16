import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TeacherOnly } from '../../common/decorators/role.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { GetMyStudentsService } from './services/getMyStudents.service';
import { UserResponseDto } from '../../core/auth/dto/response-auth.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly getMyStudentsService: GetMyStudentsService) {}

    @Get('my-students')
    @TeacherOnly()
    @ResponseMessage('Students fetched successfully')
    @HttpCode(HttpStatus.OK)
    getMyStudents(@CurrentUser() user: UserResponseDto, @Query() pagination: PaginationDto) {
        return this.getMyStudentsService.getMyStudents(user.id, pagination);
    }
}
