import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { findUserByEmailService } from './services/findUserByEmail.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,findUserByEmailService],
  exports: [findUserByEmailService]
})
export class UsersModule {}
