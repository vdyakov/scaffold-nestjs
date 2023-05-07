import { RolesEnum } from '@/decorators/roles.decorator';

export interface JwtStrategyValidate {
  sub: string;
  email: string;
  roles: RolesEnum[];
}
