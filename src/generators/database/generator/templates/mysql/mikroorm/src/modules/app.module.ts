import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import V1Module from '@/modules/v1/v1.module';

@Module({
  imports: [
    V1Module,
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dbName: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: true,
    }),
  ],
})
export default class AppModule {}
