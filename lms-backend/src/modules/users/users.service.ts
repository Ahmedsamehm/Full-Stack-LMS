import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetAllUsersService } from './services/getAllUsers.service';

@Injectable()
export class UsersService {
    constructor(private readonly getAllUsersService: GetAllUsersService) {}

    async getAllUsers() {
        return await this.getAllUsersService.getAllUsers();
    }
    
}
