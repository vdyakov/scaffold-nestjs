import { RolesEnum } from '@/decorators/roles.decorator';

export interface ValidateUserOutput {
  sub: string;
  email?: string;
  roles?: RolesEnum[];
}
