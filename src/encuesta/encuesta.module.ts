import { Module } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { EncuestaController } from './encuesta.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuesta.entity';

@Module({
  controllers: [EncuestaController],
  providers: [EncuestaService],
  imports: [  TypeOrmModule.forFeature([Encuesta])]
})
export class EncuestaModule {}
