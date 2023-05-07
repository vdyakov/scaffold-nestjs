import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule, MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { SharedModule } from '@/shared/shared.module';
import { DatabaseFactoryService } from '@/database/database-factory.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      imports: [SharedModule],
      useClass: DatabaseFactoryService,
    } as MikroOrmModuleAsyncOptions),
  ],
})
export default class AppModule {}
