import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '@/decorators/roles.decorator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'json',
    default: `["${RolesEnum.USER}"]`
  })
  roles: RolesEnum[];
}
