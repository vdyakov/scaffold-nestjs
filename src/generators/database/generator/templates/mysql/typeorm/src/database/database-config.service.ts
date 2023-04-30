import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ApiConfigService) {}

  get config(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.getString('DATABASE_HOST'),
      port: this.configService.getNumber('DATABASE_PORT'),
      database: this.configService.getString('DATABASE_NAME'),
      username: this.configService.getString('DATABASE_USERNAME'),
      password: this.configService.getString('DATABASE_PASSWORD'),
      autoLoadEntities: true,
    };
  }
}
