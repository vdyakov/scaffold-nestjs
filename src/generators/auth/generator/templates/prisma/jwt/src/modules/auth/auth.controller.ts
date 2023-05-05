import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiExtraModels,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import Auth from '@/decorators/auth.decorator';
import UserService from '@/modules/user/user.service';
import AuthBearer from '@/decorators/auth-bearer.decorator';
import WrapResponseInterceptor from '@/interceptors/wrap-response.interceptor';
import { DecodedUser } from '@/modules/auth/interfaces/decoded-user.interface';
import AuthService from '@/modules/auth/auth.service';
import RefreshTokenDto from '@/modules/auth/dtos/refresh-token.dto';
import LoginDto from '@/modules/auth/dtos/login.dto';
import SignupDto from '@/modules/auth/dtos/signup.dto';
import JwtTokenDto from '@/modules/auth/dtos/jwt-token.dto';
import { ApiConfigService } from '@/shared/services/api-config.service';

@ApiTags('Auth')
@ApiExtraModels(JwtTokenDto)
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ApiConfigService,
  ) {}

  @ApiBody({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto): Promise<JwtTokenDto> {
    const validatedUser = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (validatedUser === null) {
      throw new UnauthorizedException('Incorrect login or password');
    }

    return this.authService.login({
      sub: validatedUser.sub,
      email: validatedUser.email,
      roles: validatedUser.roles,
    });
  }

  @ApiBody({ type: SignupDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('auth/signup')
  async signup(@Body() user: SignupDto): Promise<User> {
    return this.userService.create(user);
  }

  @ApiBearerAuth()
  @Auth()
  @Post('auth/refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<JwtTokenDto | never> {
    const decodedUser = this.jwtService.decode(
      refreshTokenDto.refreshToken,
    ) as DecodedUser;

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const oldRefreshToken: string | null =
      await this.authService.getRefreshTokenByEmail(decodedUser.email);

    if (!oldRefreshToken || oldRefreshToken !== refreshTokenDto.refreshToken) {
      throw new UnauthorizedException(
        'Authentication credentials were missing or incorrect',
      );
    }

    const payload = {
      sub: decodedUser.sub,
      email: decodedUser.email,
      roles: decodedUser.roles,
    };

    return this.authService.login(payload);
  }

  @ApiBearerAuth()
  @Auth()
  @Post('auth/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@AuthBearer() token: string): Promise<void> {
    const decodedUser: DecodedUser | null = await this.authService.verifyToken(
      token,
      this.configService.getString('JWT_ACCESS_SECRET'),
    );

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const deletedTokensCount = await this.authService.deleteTokenByEmail(
      decodedUser.email,
    );

    if (deletedTokensCount === 0) {
      throw new NotFoundException();
    }
  }
}
