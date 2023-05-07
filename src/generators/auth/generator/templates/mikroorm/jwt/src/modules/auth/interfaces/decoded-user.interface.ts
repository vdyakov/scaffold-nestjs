import { RolesEnum } from '@/decorators/roles.decorator';

export interface DecodedUser {
  readonly sub: string;
  readonly email: string;
  readonly password: string;
  readonly roles: RolesEnum[];
  readonly iat?: number;
  readonly exp?: number;
}
