import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import Auth from '@/decorators/auth.decorator';
import UserService from '@/modules/user/user.service';
import Serialize from '@/decorators/serialization.decorator';
import UsersResponseDto from '@/modules/user/dtos/user-response.dto';
import WrapResponseInterceptor from '@/interceptors/wrap-response.interceptor';

@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(WrapResponseInterceptor)
@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  @Serialize(UsersResponseDto)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
