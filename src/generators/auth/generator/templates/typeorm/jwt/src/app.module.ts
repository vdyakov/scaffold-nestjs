import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@/shared/shared.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { DatabaseConfigService } from '@/database/database-config.service';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis/dist/redis/interfaces';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: DatabaseConfigService) =>
        configService.config,
      inject: [DatabaseConfigService],
    }),
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
