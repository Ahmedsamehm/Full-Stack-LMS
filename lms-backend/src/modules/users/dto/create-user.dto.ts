import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(30)
    password: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(11)
    phoneNumber: string;
}
