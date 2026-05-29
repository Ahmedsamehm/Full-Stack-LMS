import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe, Query, ParseEnumPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AdminOnly, TeacherOnly } from 'src/common/decorators/role.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { UsersResponseDto } from './dto/response-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @AdminOnly()
    @ResponseMessage('Users fetched successfully')
    @HttpCode(HttpStatus.OK)
    findAll(@CurrentUser() user: UsersResponseDto) {
        return this.usersService.getAllUsers();
    }

    @Get('me')
    @ResponseMessage('Profile fetched successfully')
    @HttpCode(HttpStatus.OK)
    findMe(@CurrentUser() user: UsersResponseDto) {
        return this.usersService.findMe(user.id);
    }
    @Get('email')
    @TeacherOnly()
    @ResponseMessage('User fetched successfully')
    @HttpCode(HttpStatus.OK)
    findOneByEmail(@Query('email') email: string) {
        return this.usersService.findUserByEmail(email);
    }
    @Get(':id')
    @ResponseMessage('User fetched successfully')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.findUserById(id);
    }

    @Post()
    @AdminOnly()
    @ResponseMessage('User created successfully')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: AdminCreateUserDto, @CurrentUser() user: UsersResponseDto) {
        return this.usersService.create(dto, user.role);
    }

    @Patch(':id')
    @ResponseMessage('User updated successfully')
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto, @CurrentUser() user: UsersResponseDto) {
        return this.usersService.update(id, dto, user.id, user.role);
    }

    @Delete(':id')
    @AdminOnly()
    @ResponseMessage('User deleted successfully')
    @HttpCode(HttpStatus.OK)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.delete(id);
    }

    @Patch(':id/role')
    @AdminOnly()
    @ResponseMessage('User role updated successfully')
    @HttpCode(HttpStatus.OK)
    changeRole(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ChangeRoleDto, @CurrentUser() user: UsersResponseDto) {
        return this.usersService.changeRole(id, dto, user.role);
    }
}
