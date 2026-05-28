import { IsEnum, IsNotEmpty } from 'class-validator';
import { Roles } from '@prisma/client';

export class ChangeRoleDto {
    @IsEnum(Roles)
    @IsNotEmpty()
    role: Roles;
}