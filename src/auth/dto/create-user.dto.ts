import { IsString, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email : string;
    @IsString()
    password: string;
    @IsString()
    @MinLength(1)
    fullName: string
}