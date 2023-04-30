import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs/typings';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ApiConfigService) {}

  get config(): MikroOrmModuleOptions {
    return {
      type: 'postgresql',
      host: this.configService.getString('DATABASE_HOST'),
      port: this.configService.getNumber('DATABASE_PORT'),
      dbName: this.configService.getString('DATABASE_NAME'),
      user: this.configService.getString('DATABASE_USERNAME'),
      password: this.configService.getString('DATABASE_PASSWORD'),
      autoLoadEntities: true,
    };
  }
}
