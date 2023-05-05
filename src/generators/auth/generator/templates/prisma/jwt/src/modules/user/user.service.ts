import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import PrismaService from '@/modules/prisma/prisma.service';
import SignupDto from '@/modules/auth/dtos/signup.dto';
import UpdateUserDto from '@/modules/user/dtos/update-user.dto';
import { RolesEnum } from '@/decorators/roles.decorator';

@Injectable()
export default class UserService {
  constructor(private prisma: PrismaService) {}

  public async create(userDto: SignupDto): Promise<User> {
    const { email, password } = userDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        password: hashedPassword,
        email,
        roles: [RolesEnum.USER],
      },
    });
  }

  public async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (null === user) {
      throw new NotFoundException();
    }

    return this.prisma.user.update({
      data,
      where: {
        id: user.id,
      },
    });
  }

  public async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
