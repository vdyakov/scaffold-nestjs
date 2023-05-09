import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDocument } from '@/modules/user/schemas/user.schema';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { JwtStrategyValidate } from '@/modules/auth/interfaces/jwt-strategy-validate.interface';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ApiConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getString('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(payload: UserDocument): Promise<JwtStrategyValidate> {
    return {
      sub: payload._id,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
