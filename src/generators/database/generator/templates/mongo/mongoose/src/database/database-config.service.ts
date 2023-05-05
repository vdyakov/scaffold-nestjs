import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@/shared/services/api-config.service';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

@Injectable()
export class DatabaseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ApiConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.getString('DATABASE_URL'),
    };
  }
}
