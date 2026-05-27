import { Roles, UserStatus } from '@prisma/client';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  createdAt: Date;
  
}