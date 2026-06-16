import { Injectable } from '@nestjs/common';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { UserQueryDto } from 'src/common/dto/pagination.dto';
import { GetAllUsersService } from './services/getAllUsers.service';
import { FindUserByIdService } from './services/findUserById.service';
import { CreateUserService } from './services/createUser.service';
import { UpdateUserService } from './services/updateUser.service';
import { DeleteUserService } from './services/deleteUser.service';
import { ChangeUserRoleService } from './services/changeUserRole.service';
import { FindPublicUserByEmailService } from './services/findPublicUserByEmail.service';
import { GetUserDetailsService } from './services/getUserDetails.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly getAllUsersService: GetAllUsersService,
        private readonly findUserByIdService: FindUserByIdService,
        private readonly createUserService: CreateUserService,
        private readonly updateUserService: UpdateUserService,
        private readonly deleteUserService: DeleteUserService,
        private readonly changeUserRoleService: ChangeUserRoleService,
        private readonly FindUserByEmailService: FindPublicUserByEmailService,
        private readonly getUserDetailsService: GetUserDetailsService,
    ) {}

    async getAllUsers(query: UserQueryDto, currentUserId: string, currentUserRole: string) {
        return await this.getAllUsersService.getAllUsers(query, currentUserId, currentUserRole);
    }

    async findUserById(id: string) {
        return await this.findUserByIdService.findUserById(id);
    }

    async getUserDetails(id: string) {
        return await this.getUserDetailsService.getUserDetails(id);
    }

    async findMe(currentUserId: string) {
        return await this.findUserByIdService.findUserById(currentUserId);
    }

    async findUserByEmail(email: string) {
        return await this.FindUserByEmailService.findPublicUserByEmail(email);
    }

    async create(dto: AdminCreateUserDto, currentUserRole: string) {
        return await this.createUserService.create(dto, currentUserRole);
    }

    async update(id: string, dto: UpdateUserDto, currentUserId: string, currentUserRole: string) {
        return await this.updateUserService.update(id, dto, currentUserId, currentUserRole);
    }

    async delete(id: string) {
        return await this.deleteUserService.delete(id);
    }

    async changeRole(id: string, dto: ChangeRoleDto, currentUserRole: string) {
        return await this.changeUserRoleService.changeRole(id, dto, currentUserRole);
    }
}
