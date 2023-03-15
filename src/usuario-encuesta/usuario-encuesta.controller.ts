import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioEncuestaService } from './usuario-encuesta.service';
import { CreateUsuarioEncuestaDto } from './dto/create-usuario-encuesta.dto';
import { UpdateUsuarioEncuestaDto } from './dto/update-usuario-encuesta.dto';

@Controller('usuarioEncuesta')
export class UsuarioEncuestaController {
  constructor(private readonly usuarioEncuestaService: UsuarioEncuestaService) {}

  @Post()
  create(@Body() createUsuarioEncuestaDto: CreateUsuarioEncuestaDto) {
    return this.usuarioEncuestaService.create(createUsuarioEncuestaDto);
  }

  @Get()
  findAll() {
    return this.usuarioEncuestaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioEncuestaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioEncuestaDto: UpdateUsuarioEncuestaDto) {
    return this.usuarioEncuestaService.update(+id, updateUsuarioEncuestaDto);
  } 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioEncuestaService.remove(+id);
  }
}
