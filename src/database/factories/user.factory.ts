import {define} from 'typeorm-seeding';
import { User } from '../../auth/entities/user.entity';
import { randEmail,randFullName,randGender, randNumber,randAddress, randText,randBoolean } from '@ngneat/falso';
import * as bcrypt from 'bcrypt';
define(User, ()=>{
    const user = new User();
    user.email = randEmail();
    user.password = bcrypt.hashSync('password', 10);
    user.fullName = randFullName();
    user.sexo = randGender();
    user.edad = randNumber();
    user.poblacion = randText();
    user.instituto = randText();
    user.isActive = randBoolean();
    user.roles = ['user'];
    
    return user;
})