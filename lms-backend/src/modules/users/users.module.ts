import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { findUserByEmailService } from './services/findUserByEmail.service';
import { GetAllUsersService } from './services/getAllUsers.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, findUserByEmailService, GetAllUsersService],
    exports: [findUserByEmailService],
})
export class UsersModule {}
