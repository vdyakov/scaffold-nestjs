import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import V1Module from '@/modules/v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    V1Module,
  ],
})
export default class AppModule {}
