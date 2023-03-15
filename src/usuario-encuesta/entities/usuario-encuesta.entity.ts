import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Encuesta } from '../../encuesta/entities/encuesta.entity';
import { User } from "src/auth/entities/user.entity";
import { UserAnswer } from "src/pregunta/dto/interfaces";

@Entity('usuario-encuesta')

export class UsuarioEncuesta {

     @PrimaryGeneratedColumn()
     id?: number;

    // @Column()
    // id_usuario: number;

    // @Column()
    // id_encuesta: number;

    // @ManyToOne(() => Encuesta, usuario => usuario.id)
    // infEncuesta: Encuesta;

    @ManyToOne(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (type) => Encuesta,
        (Encuesta) => Encuesta.id,
        { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
      )
      @JoinTable()
      Encuesta: Encuesta;
    
      @ManyToOne(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (type) => User,
        (user) => user.id,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
      )
      @JoinTable()
      user: User;

      @Column('bool', {
        default: true
    })
    estatus: boolean;

      @Column({
        type: 'varchar',
        length: 10,
        nullable: true,
      })
      created: string;
    
     @Column({
        type: 'json'
    })
    answers: UserAnswer[];

}
