import { IsString } from "class-validator";

export class CreateEncuestaDto {
    @IsString()
    title : string;
    @IsString()
    description: string;
}
