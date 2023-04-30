import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule, MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { SharedModule } from '@/shared/shared.module';
import { DatabaseConfigService } from '@/database/database-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: DatabaseConfigService) =>
        configService.config,
      inject: [DatabaseConfigService],
    } as MikroOrmModuleAsyncOptions),
  ],
})
export default class AppModule {}
