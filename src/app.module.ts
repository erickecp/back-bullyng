import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EncuestaModule } from './encuesta/encuesta.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { VideoModule } from './video/video.module';
import { UsuarioEncuestaModule } from './usuario-encuesta/usuario-encuesta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'testBull',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    EncuestaModule,
    UsuarioEncuestaModule,
    PreguntaModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
