import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { LoginUSerDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayl } from './interfaces/jwtpkensito.interface';
import { UpdateUserDto } from './dto/update-user.dto';

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

      const {password, roles, ...userData} = createAuthDto

      const user = this.userRepository.create({
        roles: [`${roles}`],
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
      select: {email: true, password: true, fullName: true, id: true, sexo: true, poblacion:true, instituto:true, roles: true }
    })

    if(!userFind) 
      throw new UnauthorizedException('Las crdenciales no son validas');
    
    if(!bcrypt.compareSync(password, userFind.password))
      throw new UnauthorizedException('Las crdenciales no son validas');

    delete(userFind.password); 
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


  /*
  .##.....##..######..##.....##....###....########..####..#######...######.
  .##.....##.##....##.##.....##...##.##...##.....##..##..##.....##.##....##
  .##.....##.##.......##.....##..##...##..##.....##..##..##.....##.##......
  .##.....##..######..##.....##.##.....##.########...##..##.....##..######.
  .##.....##.......##.##.....##.#########.##...##....##..##.....##.......##
  .##.....##.##....##.##.....##.##.....##.##....##...##..##.....##.##....##
  ..#######...######...#######..##.....##.##.....##.####..#######...######.
  */

  async getAll(){
    const users = await this.userRepository.find(
      {
        where: {
          isActive: true
        }
      }
    );
    return users;
  }


  /*
  .########.####.##....##.########...#######..##....##.########
  .##........##..###...##.##.....##.##.....##.###...##.##......
  .##........##..####..##.##.....##.##.....##.####..##.##......
  .######....##..##.##.##.##.....##.##.....##.##.##.##.######..
  .##........##..##..####.##.....##.##.....##.##..####.##......
  .##........##..##...###.##.....##.##.....##.##...###.##......
  .##.......####.##....##.########...#######..##....##.########
  */

  async findOne(id: any){
    
    const user = await this.userRepository.findOne(
      {
        where: {
          id: id
        }
      }
    );
    if(!user){
      return null;
    }
    return user;
  }


  async update(id: string, body: UpdateUserDto ){
    const bodys ={...body, roles: body.roles};
    console.log('body', body)
    const user = await this.findOne(id);
    if(!user)
    {
      throw new BadRequestException('El usuario no existe');
    }

    await this.userRepository.update(id, bodys);
    const userUpd = this.userRepository.findOne(
      {
        where: {
          id
        }
      }
    );
    return userUpd;
  }

  async remove(id: string){
    const user = await this.findOne(id);
    if(!user){
      throw new BadRequestException('El usuario no existe');
    }
    await this.userRepository.update(id, {
      isActive: false
    });

  }

  /*
  ..######..########....###....########...######..##.....##
  .##....##.##.........##.##...##.....##.##....##.##.....##
  .##.......##........##...##..##.....##.##.......##.....##
  ..######..######...##.....##.########..##.......#########
  .......##.##.......#########.##...##...##.......##.....##
  .##....##.##.......##.....##.##....##..##....##.##.....##
  ..######..########.##.....##.##.....##..######..##.....##
  */


  async search(term: string){
    const users = await this.userRepository.find(
      {
        where: {
          fullName: Like(`%${term}%`),
        }
      }
    );
    return users;
  }

}
