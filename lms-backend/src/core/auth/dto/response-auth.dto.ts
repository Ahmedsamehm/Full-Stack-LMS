import { Roles, UserStatus } from '@prisma/client';

export class UserResponseDto {
    id: string;
    name: string;
    email: string;
    role: Roles;
    status: UserStatus;
    createdAt: Date;
}
