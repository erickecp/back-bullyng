import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy} from '@nestjs/passport';
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { jwtPayl } from "../interfaces/jwtpkensito.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretBull',
        });
    }

    async validate( payload: jwtPayl): Promise<User> {

        const {id} = payload;
        const user = await this.userRepository.findOneBy({id});
        if(!user)
            throw new UnauthorizedException('Token no valido');
        if(!user.isActive)
            throw new UnauthorizedException('Usuario inactivo');
        return user;
    }

}