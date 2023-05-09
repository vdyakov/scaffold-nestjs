import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from '@/modules/user/user.entity';
import SignupDto from '@/modules/auth/dtos/signup.dto';
import UpdateUserDto from '@/modules/user/dtos/update-user.dto';

@Injectable()
export default class UserRepository {
  constructor(protected readonly entityManager: EntityManager) {}

  public async create(userDto: SignupDto): Promise<User> {
    const { email, password } = userDto;

    const user = new User(email, password);

    await this.entityManager.persistAndFlush(user);

    return user;
  }

  public async updateById(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (null === user) {
      throw new NotFoundException();
    }

    user.roles = data.roles;

    await this.entityManager.flush();

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    return this.entityManager.findOne<User>(User, id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.entityManager.findOne<User>(User, { email });
  }

  public async getAll(): Promise<User[]> {
    return this.entityManager.find<User>(User, {});
  }
}
