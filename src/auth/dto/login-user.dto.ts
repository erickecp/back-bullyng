import { IsString, IsEmail } from "class-validator";

export class LoginUSerDto {
    @IsString()
    @IsEmail()
    email : string;
    @IsString()
    password: string;
}
   