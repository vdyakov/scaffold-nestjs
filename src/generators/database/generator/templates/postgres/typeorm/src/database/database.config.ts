import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApiConfigService } from '../shared/services/api-config.service';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
const apiConfigService = new ApiConfigService(configService);

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: apiConfigService.getString('DATABASE_HOST'),
  port: apiConfigService.getNumber('DATABASE_PORT'),
  database: apiConfigService.getString('DATABASE_NAME'),
  username: apiConfigService.getString('DATABASE_USERNAME'),
  password: apiConfigService.getString('DATABASE_PASSWORD'),
  migrations: ['dist/database/migrations/**/*{.js,.ts}'],
  entities: ['dist/modules/**/*.entity{.js,.ts}'],
}

export const baseConfig: TypeOrmModuleOptions = {
  ...dataSourceConfig,
  autoLoadEntities: true,
};

export default new DataSource(dataSourceConfig);
