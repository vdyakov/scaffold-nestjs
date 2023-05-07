import type { Provider } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

import { ApiConfigService } from '@/shared/services/api-config.service';

const providers: Provider[] = [
  ApiConfigService,
];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
