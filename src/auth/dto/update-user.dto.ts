import { IsString, IsEmail, MinLength, IsNumber } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsEmail()
    email : string;
    @IsString()
    @MinLength(1)
    fullName: string;
    @IsString()
    @MinLength(1)
    instituto: string;
    @IsString()
    @MinLength(1)
    poblacion: string;
    @IsString()
    sexo: string;
    @IsNumber()
    edad: number;
    roles: string[]
    
    
}