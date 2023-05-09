import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { RolesEnum } from '@/decorators/roles.decorator';

export default class UpdateUserDto {
  @ApiPropertyOptional({
    enum: RolesEnum,
    isArray: true,
    example: [RolesEnum.USER],
  })
  @IsOptional()
  @IsArray()
  readonly roles: RolesEnum[] = [RolesEnum.USER];
}
