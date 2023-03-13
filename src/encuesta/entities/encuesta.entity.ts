import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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



}
