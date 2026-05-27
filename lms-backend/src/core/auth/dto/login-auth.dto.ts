import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginAuthDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}