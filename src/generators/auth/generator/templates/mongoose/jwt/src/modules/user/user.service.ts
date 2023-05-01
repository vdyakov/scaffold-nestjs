import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { User } from '@/modules/user/schemas/user.schema';
import SignupDto from '@/modules/auth/dtos/signup.dto';
import UserRepository from '@/modules/user/user.repository';
import UpdateUserDto from '@/modules/user/dtos/update-user.dto';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  public async create(user: SignupDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.userRepository.create({
      password: hashedPassword,
      email: user.email,
    });
  }

  public update(
    id: string,
    data: UpdateUserDto,
  ): Promise<User | null> {
    return this.userRepository.updateById(id, data);
  }

  public findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  public getAllUsers() {
    return this.userRepository.getAll();
  }
}
