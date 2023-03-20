import { Injectable } from '@nestjs/common';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EncuestaService {

  constructor( @InjectRepository(Encuesta) private readonly encuestaRepository: Repository<Encuesta>,) {

  }

  async create(createEncuestaDto: CreateEncuestaDto) {

    const encuesta = this.encuestaRepository.create(createEncuestaDto);
    await this.encuestaRepository.save(encuesta);

    return encuesta;
  }

  findAll() {
    const encuestas = this.encuestaRepository.find({
      where: { isActive: true },
      relations: ['preguntas', 'videos']
    }
    );
    return encuestas;
  }

  findOne(id: number) {
    const encuesta = this.encuestaRepository.findOne(
      {
        where: {
          id
        },
        relations: ['preguntas', 'videos']
      }
    );

    return encuesta;
  }

  async update(id: number, updateEncuestaDto: UpdateEncuestaDto) {
   
    await this.encuestaRepository.update(id, updateEncuestaDto);
    const encuesta = this.encuestaRepository.findOne(
      {
        where: {
          id
        }
      }
    );
    return encuesta;
  }
      
/*
....###.....######..########.####.##.....##....###....########.
...##.##...##....##....##.....##..##.....##...##.##...##.....##
..##...##..##..........##.....##..##.....##..##...##..##.....##
.##.....##.##..........##.....##..##.....##.##.....##.########.
.#########.##..........##.....##...##...##..#########.##...##..
.##.....##.##....##....##.....##....##.##...##.....##.##....##.
.##.....##..######.....##....####....###....##.....##.##.....##
*/
  async active(id: number) {
    await this.encuestaRepository.update(id, { isActive: false });
    const encuesta = this.encuestaRepository.findOne(
      {
        where: {
          id
        }
      }
    );
    return encuesta;
}
}
