import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@/shared/shared.module';
import { DatabaseConfigService } from '@/database/database-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: DatabaseConfigService,
      imports: [SharedModule],
    }),
  ],
})
export default class AppModule {}
