import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import V1Module from '@/modules/v1/v1.module';

@Module({
  imports: [
    V1Module,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL)
  ],
})
export default class AppModule {}
