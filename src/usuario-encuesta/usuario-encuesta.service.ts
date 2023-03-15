import { Injectable } from '@nestjs/common';
import { CreateUsuarioEncuestaDto } from './dto/create-usuario-encuesta.dto';
import { UpdateUsuarioEncuestaDto } from './dto/update-usuario-encuesta.dto';

@Injectable()
export class UsuarioEncuestaService {
  create(createUsuarioEncuestaDto: CreateUsuarioEncuestaDto) {
    return 'This action adds a new usuarioEncuesta';
  }

  findAll() {
    return `This action returns all usuarioEncuesta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioEncuesta`;
  }

  update(id: number, updateUsuarioEncuestaDto: UpdateUsuarioEncuestaDto) {
    return `This action updates a #${id} usuarioEncuesta`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioEncuesta`;
  }
}
