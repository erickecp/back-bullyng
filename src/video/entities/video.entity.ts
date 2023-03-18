import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pregunta } from '../../pregunta/entities/pregunta.entity';
import { Encuesta } from 'src/encuesta/entities/encuesta.entity';
@Entity('video')
export class Video {
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

    @Column({
        type: 'varchar',
    })
    ruta: string;

    
    @ManyToOne(() => Encuesta, encuesta => encuesta.videos)
    encuesta: Encuesta;
   

    

}
