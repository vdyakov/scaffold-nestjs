import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule, MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { SharedModule } from '@/shared/shared.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { DatabaseConfigService } from '@/database/database-config.service';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis/dist/redis/interfaces';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: DatabaseConfigService) =>
        configService.config,
      inject: [DatabaseConfigService],
    } as MikroOrmModuleAsyncOptions),
    RedisModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        config: {
          url: configService.getString('REDIS_URL'),
        },
      }),
      inject: [ApiConfigService],
    } as RedisModuleAsyncOptions),
  ],
})
export default class AppModule {}
