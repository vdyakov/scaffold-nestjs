import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import UserModule from '@/modules/user/user.module';
import AuthRepository from '@/modules/auth/auth.repository';
import PublicStrategy from '@/modules/auth/strategies/public.strategy';
import JwtAccessStrategy from '@/modules/auth/strategies/jwt-access.strategy';
import JwtRefreshStrategy from '@/modules/auth/strategies/jwt-refresh.strategy';
import AuthController from '@/modules/auth/auth.controller';
import AuthService from '@/modules/auth/auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    PublicStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    AuthRepository,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
