import { Entity, PrimaryKey, Property, Enum } from '@mikro-orm/core';
import { RolesEnum } from '@/decorators/roles.decorator';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id: string = uuid();

  @Property({
    nullable: false,
    unique: true,
    type: String,
  })
  email: string = '';

  @Property({
    nullable: false,
    type: String,
  })
  password: string = '';

  @Enum({ items: () => RolesEnum, array: true, default: [RolesEnum.USER] })
  roles: RolesEnum[] = [RolesEnum.USER];

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
