import { SharedModule } from '@/shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { DatabaseConfigService } from '@/database/database-config.service';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis/dist/redis/interfaces';
import UserModule from '@/modules/user/user.module';
import AuthModule from '@/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: DatabaseConfigService,
      imports: [SharedModule],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        config: {
          url: configService.getString('REDIS_URL'),
        },
      }),
      inject: [ApiConfigService],
    } as RedisModuleAsyncOptions),
    UserModule,
    AuthModule,
  ],
})
export default class AppModule {}
