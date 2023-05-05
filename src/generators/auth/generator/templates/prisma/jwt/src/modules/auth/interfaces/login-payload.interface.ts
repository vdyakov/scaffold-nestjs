import { RolesEnum } from '@/decorators/roles.decorator';

export interface LoginPayload {
  readonly sub?: string;
  readonly email: string;
  readonly roles: RolesEnum[];
}
