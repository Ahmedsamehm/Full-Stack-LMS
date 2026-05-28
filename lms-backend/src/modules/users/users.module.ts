import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { findUserByEmailService } from './services/findUserByEmail.service';
import { GetAllUsersService } from './services/getAllUsers.service';
import { FindUserByIdService } from './services/findUserById.service';
import { CreateUserService } from './services/createUser.service';
import { UpdateUserService } from './services/updateUser.service';
import { DeleteUserService } from './services/deleteUser.service';
import { ChangeUserRoleService } from './services/changeUserRole.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, findUserByEmailService, GetAllUsersService, FindUserByIdService, CreateUserService, UpdateUserService, DeleteUserService, ChangeUserRoleService],
    exports: [findUserByEmailService],
})
export class UsersModule {}