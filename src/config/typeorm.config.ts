import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

//*quitar el src y agregar dos puntos
import { User } from '../auth/entities/user.entity';
// import { Pregunta } from '../pregunta/entities/pregunta.entity';
// import { Encuesta } from '../encuesta/entities/encuesta.entity';
// import { Video } from '../video/entities/video.entity';


export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'rome',
        database: 'testBull',
      // entities: [__dirname + '/../**/*.entity.{js,ts}'],
      entities: [
        User,
        // Pregunta,
        // Encuesta,
        // Video
      ],
      // migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    //   cli: {
    //     migrationsDir: __dirname + '/../database/migrations',
    //   },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'rome',
    database: 'testBull',
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: [
    User,
    // Pregunta,
    // Encuesta,
    // Video
  ],
  // migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//   cli: {
//     migrationsDir: __dirname + '/../database/migrations',
//   },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
};