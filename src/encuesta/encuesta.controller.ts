import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';

@Controller('encuesta')
export class EncuestaController {
  constructor(private readonly encuestaService: EncuestaService) {}

  @Post()
  create(@Body() createEncuestaDto: CreateEncuestaDto) {
    return this.encuestaService.create(createEncuestaDto);
  }
  
  @Get()
  findAll() {
    return this.encuestaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.encuestaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEncuestaDto: UpdateEncuestaDto) {
    return this.encuestaService.update(id, updateEncuestaDto);
  }

  @Patch('activar/:id')
  active(@Param('id') id: number) {
    return this.encuestaService.active(id);
  }
}
