import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@/modules/user/user.entity';
import UserController from '@/modules/user/user.controller';
import UserService from '@/modules/user/user.service';
import UserRepository from '@/modules/user/user.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [User],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export default class UserModule {}
