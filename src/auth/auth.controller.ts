import { Controller, Get, Post, Body, Patch,Put, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { AuthGuard} from '@nestjs/passport'
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUSerDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/validroles.interface';
import { UserRoleGuard } from './guards/user-role.guard';
import { Auth } from './decorators/auth.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() user: CreateUserDto) {
    return this.authService.create(user);
  }

  @Post('login')
  login(@Body() user: LoginUSerDto) {
    return this.authService.login(user);
  }

  @Get('private')
  @UseGuards( AuthGuard())
  testingRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
  ) {
    return {
      message: 'testing route',
      ok: true,
      user,
      userEmail
    };
  }

  @Get('all')
  // @Auth(ValidRoles.user)
  getAll(
  ) {
    return this.authService.getAll();
  }
  
  @Get('search')
  search(@Query('term') term: string) {
    return this.authService.search(term);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateUserDto) {
    return this.authService.update(id, updateAuthDto);
  }
  
  @Patch('active/:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  } 



  @Get('private2')
  @RoleProtected(ValidRoles.superAdmin)
  @UseGuards( AuthGuard(), UserRoleGuard) 
  testingRoute2(
    @GetUser() user: User,
  ) {
    return {
      message: 'testing route',
      ok: true,
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.user)
  testingRoute3(
    @GetUser() user: User,
  ) {
    return {
      message: 'testing route',
      ok: true,
      user,
    };
  }

  /*

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  } */
}
