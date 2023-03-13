import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import "reflect-metadata"
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PassportModule, JwtModule],
  imports: [  TypeOrmModule.forFeature([User]),
PassportModule.register({
  defaultStrategy: 'jwt'
}),
JwtModule.register({
      secret: 'secretBull',
      signOptions: {
        expiresIn: '1h'
      }
})
],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]

})
export class AuthModule {}
