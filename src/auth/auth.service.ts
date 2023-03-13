import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { LoginUSerDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayl } from './interfaces/jwtpkensito.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtS: JwtService

  ){}
/*
.########..########..######...####..######..########.########.########.
.##.....##.##.......##....##...##..##....##....##....##.......##.....##
.##.....##.##.......##.........##..##..........##....##.......##.....##
.########..######...##...####..##...######.....##....######...########.
.##...##...##.......##....##...##........##....##....##.......##...##..
.##....##..##.......##....##...##..##....##....##....##.......##....##.
.##.....##.########..######...####..######.....##....########.##.....##
*/
  async create(createAuthDto: CreateUserDto) {
    try {

      const {password, ...userData} = createAuthDto

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.getJWToken({id: user.id, fullName: user.fullName})
      };
            
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  /*
  .##........#######...######...####.##....##
  .##.......##.....##.##....##...##..###...##
  .##.......##.....##.##.........##..####..##
  .##.......##.....##.##...####..##..##.##.##
  .##.......##.....##.##....##...##..##..####
  .##.......##.....##.##....##...##..##...###
  .########..#######...######...####.##....##
  */

  async login(user: LoginUSerDto) {
    
    const {password, email} = user;

    const userFind = await this.userRepository.findOne({
      where :{ email },
      select: {email: true, password: true, id: true}
    })

    if(!userFind) 
      throw new UnauthorizedException('Las crdenciales no son validas');
    
    if(!bcrypt.compareSync(password, userFind.password))
      throw new UnauthorizedException('Las crdenciales no son validas');

    return {
      ...userFind,
      token: this.getJWToken({id: userFind.id, fullName: userFind.fullName})
    };

  }

  /*
  .########.########..########...#######..########..########..######.
  .##.......##.....##.##.....##.##.....##.##.....##.##.......##....##
  .##.......##.....##.##.....##.##.....##.##.....##.##.......##......
  .######...########..########..##.....##.########..######....######.
  .##.......##...##...##...##...##.....##.##...##...##.............##
  .##.......##....##..##....##..##.....##.##....##..##.......##....##
  .########.##.....##.##.....##..#######..##.....##.########..######.
  */

  handleDBErrors( err : any): never {
    if(err.code === '23505')
      throw new BadRequestException(
        err.detail
      );
      console.log(err)
      throw new InternalServerErrorException('Chekale')
  }



  /*
  .########..#######..##....##.########.##....##
  ....##....##.....##.##...##..##.......###...##
  ....##....##.....##.##..##...##.......####..##
  ....##....##.....##.#####....######...##.##.##
  ....##....##.....##.##..##...##.......##..####
  ....##....##.....##.##...##..##.......##...###
  ....##.....#######..##....##.########.##....##
  */

  private getJWToken(payload: jwtPayl){

    const token = this.jwtS.sign(payload);
    return token;

  }

}
