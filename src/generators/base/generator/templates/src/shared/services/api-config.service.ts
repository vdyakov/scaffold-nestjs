import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  public getNumber(key: string, byDefault = 0): number {
    const value = this.get(key);

    return '' !== value ? Number(value) : byDefault;
  }

  public getBoolean(key: string, byDefault = false): boolean {
    const value = this.get(key);

    return '' !== value ? Boolean(JSON.parse(value)) : byDefault;
  }

  public getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  private get(key: string): string {
    return this.configService.get<string>(key) || '';
  }
}
