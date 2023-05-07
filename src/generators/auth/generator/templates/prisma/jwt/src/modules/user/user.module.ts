import { Module } from '@nestjs/common';
import UserController from '@/modules/user/user.controller';
import UserService from '@/modules/user/user.service';
import PrismaModule from '@/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export default class UserModule {}
