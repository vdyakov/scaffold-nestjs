import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '@/modules/user/schemas/user.schema';
import UserController from '@/modules/user/user.controller';
import UserService from '@/modules/user/user.service';
import UserRepository from '@/modules/user/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema,
    }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export default class UserModule {}
