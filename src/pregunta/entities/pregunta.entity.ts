import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Encuesta } from '../../encuesta/entities/encuesta.entity';
import { IAnswerType } from '../dto/interfaces';
@Entity('pregunta')
export class Pregunta {
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
    tipo_pregunta: string;

    @Column({
        type: 'json'
    })
    answers: IAnswerType[];

    @ManyToOne(() => Encuesta, encuesta => encuesta.preguntas)
    encuesta: Encuesta;
   



}
