import { PartialType } from '@nestjs/mapped-types';
import { CreateEncuestaDto } from './create-encuesta.dto';
import { IsString } from 'class-validator';

export class UpdateEncuestaDto extends PartialType(CreateEncuestaDto) {
    @IsString()
    title : string;
    @IsString()
    description: string;
}
