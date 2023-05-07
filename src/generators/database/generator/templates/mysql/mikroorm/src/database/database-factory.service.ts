import { Injectable } from '@nestjs/common';
import mikroOrmConfig from '@/database/database.config';
import { MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs/typings';

@Injectable()
export class DatabaseFactoryService implements MikroOrmOptionsFactory {
  createMikroOrmOptions(): MikroOrmModuleOptions {
    return mikroOrmConfig;
  }
}
