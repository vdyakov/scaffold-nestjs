import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { RolesEnum } from '@/decorators/roles.decorator';

export class UserResponseDto {
  id: string;

  roles: RolesEnum[] = [RolesEnum.USER];

  email: string = '';

  @Exclude()
  password: string = '';
}

export default class UsersResponseDto {
  @ValidateNested({ each: true })
  @Type(() => UserResponseDto)
  data?: UserResponseDto[] = []
}
