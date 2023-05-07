import * as Redis from 'ioredis';

import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ApiConfigService } from '@/shared/services/api-config.service';

@Injectable()
export default class AuthRepository {
  private readonly redisClient: Redis.Redis;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ApiConfigService,
  ) {
    this.redisClient = redisService.getClient();
  }

  public async addRefreshToken(userEmail: string, refreshToken: string): Promise<void> {
    await this.redisClient.set(
      userEmail,
      refreshToken,
      'EX',
      this.configService.getNumber('JWT_REFRESH_EXPIRATION_TIME'),
    );
  }

  public getToken(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  public removeToken(key: string): Promise<number> {
    return this.redisClient.del(key);
  }

  public removeAllTokens(): Promise<string> {
    return this.redisClient.flushall();
  }
}
