import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@/modules/user/user.entity';
import SignupDto from '@/modules/auth/dtos/signup.dto';
import UpdateUserDto from '@/modules/user/dtos/update-user.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(userDto: SignupDto): Promise<User> {
    const { email, password } = userDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      password: hashedPassword,
      email,
    });

    await this.userRepository.insert(user);

    return user;
  }

  public async update(
    id: string,
    data: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.findById(id);

    if (null === user) {
      throw new NotFoundException();
    }

    delete user.password;

    return await this.userRepository.save({ ...user, ...data });
  }

  public async findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
