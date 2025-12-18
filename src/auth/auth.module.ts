import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // <-- AJOUTE ÇA
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { JwtStrategy } from './jwt.strategy'; // <-- AJOUTE ÇA

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule, // <-- INDISPENSABLE pour que les Guards fonctionnent
    JwtModule.register({
      global: true,
      secret: 'SECRET_KEY_123',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy], // <-- AJOUTE JwtStrategy ICI
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}