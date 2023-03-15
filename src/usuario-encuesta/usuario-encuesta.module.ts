import { Module } from '@nestjs/common';
import { UsuarioEncuestaService } from './usuario-encuesta.service';
import { UsuarioEncuestaController } from './usuario-encuesta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEncuesta } from './entities/usuario-encuesta.entity';

@Module({
  controllers: [UsuarioEncuestaController],
  providers: [UsuarioEncuestaService],
  imports: [  TypeOrmModule.forFeature([UsuarioEncuesta])]
})
export class UsuarioEncuestaModule {}
