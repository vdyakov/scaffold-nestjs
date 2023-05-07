import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule, MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { SharedModule } from '@/shared/shared.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { DatabaseFactoryService } from '@/database/database-factory.service';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis/dist/redis/interfaces';
import UserModule from '@/modules/user/user.module';
import AuthModule from '@/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      imports: [SharedModule],
      useClass: DatabaseFactoryService,
    } as MikroOrmModuleAsyncOptions),
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
