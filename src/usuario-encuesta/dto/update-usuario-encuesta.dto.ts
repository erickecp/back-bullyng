import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioEncuestaDto } from './create-usuario-encuesta.dto';

export class UpdateUsuarioEncuestaDto extends PartialType(CreateUsuarioEncuestaDto) {}
