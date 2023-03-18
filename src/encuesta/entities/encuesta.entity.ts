import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pregunta } from '../../pregunta/entities/pregunta.entity';
import { Video } from 'src/video/entities/video.entity';
@Entity('encuesta')
export class Encuesta {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'text'
    })
    description: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;
    
    @OneToMany(() => Pregunta, pregunta => pregunta.encuesta)
    preguntas: Pregunta[];

      
    @OneToMany(() => Video, video => video.encuesta)
    videos: Video[];




}
