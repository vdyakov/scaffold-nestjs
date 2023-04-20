import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import V1Module from '@/modules/v1/v1.module';

@Module({
  imports: [
    V1Module,
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot({
      type: 'postgresql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dbName: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
    }),
  ],
})
export default class AppModule {}
