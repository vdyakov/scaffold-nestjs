import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

import SignupDto from '@/modules/auth/dtos/signup.dto';
import { RolesEnum } from '@/decorators/roles.decorator';

export default class UpdateUserDto extends PartialType(SignupDto) {
  @ApiPropertyOptional({
    enum: RolesEnum,
    isArray: true,
    example: [RolesEnum.USER],
  })
  @IsOptional()
  @IsArray()
  readonly roles: RolesEnum[] = [RolesEnum.USER];
}
