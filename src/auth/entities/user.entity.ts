import {  BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', { select: false})
    password: string;

    @Column('text')
    fullName: string;

    @Column('text')
    sexo: string;

    @Column('int')
    edad: number;

    @Column('text')
    poblacion: string;

    @Column('text')
    instituto: string;
    

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @BeforeInsert()
    checkEmail(){
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    checkEmailUpdt(){
        this.checkEmail();
    }

  


    

}