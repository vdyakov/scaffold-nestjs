import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@/shared/services/api-config.service';
import {
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ApiConfigService) {}

  get config(): MongooseModuleFactoryOptions {
    return {
      uri: this.configService.getString('DATABASE_URL'),
    };
  }
}
