import { ConfigService } from '@nestjs/config';
import { ApiConfigService } from '../shared/services/api-config.service';
import { config } from 'dotenv';
import { Options } from '@mikro-orm/core';

config();

const configService = new ConfigService();
const apiConfigService = new ApiConfigService(configService);

const mikroOrmConfig: Options = {
  type: 'postgresql',
  host: apiConfigService.getString('DATABASE_HOST'),
  port: apiConfigService.getNumber('DATABASE_PORT'),
  dbName: apiConfigService.getString('DATABASE_NAME'),
  user: apiConfigService.getString('DATABASE_USERNAME'),
  password: apiConfigService.getString('DATABASE_PASSWORD'),
  entities: ['dist/modules/**/*.entity.js'],
  entitiesTs: ['src/modules/**/*.entity.ts'],
  migrations: {
    path: './src/database/migrations',
  },
}

export default mikroOrmConfig;
