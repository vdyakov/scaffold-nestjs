import { Injectable } from '@nestjs/common';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { ApiConfigService } from '@/shared/services/api-config.service';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { dynamicImport } from '@/shared/helpers/dynamic-import';

@Injectable()
export class KeycloakService {
  private keycloak: KeycloakAdminClient;

  constructor(
    public configService: ApiConfigService,
  ) {
    this.initialize();
  }

  async initialize(): Promise<void> {
    const baseUrl: string = this.configService.getString('KEYCLOAK_URL');
    const realmName: string = this.configService.getString('KEYCLOAK_REALM');

    const KeycloakClient = (
      await dynamicImport('@keycloak/keycloak-admin-client')
    ).default;

    this.keycloak = new KeycloakClient({
      baseUrl,
      realmName,
    });

    await this.auth();
  }

  async auth(): Promise<void> {
    const clientId: string = this.configService.getString('KEYCLOAK_CLIENT_ID');
    const username: string = this.configService.getString('KEYCLOAK_API_USERNAME');
    const password: string = this.configService.getString('KEYCLOAK_API_PASSWORD');

    await this.keycloak.auth({
      username,
      password,
      clientId,
      grantType: 'password',
    });
  }

  async getUserByEmail(email: string): Promise<UserRepresentation | null> {
    const users = await this.keycloak.users.find({
      exact: true,
      email,
    });

    if (!!users['error'] || users.length === 0) {
      return null;
    }

    return users[0] ?? null;
  }

  async getAllUsers(onlyActive: boolean = true): Promise<UserRepresentation[]> {
    let users = [];
    let usersCount = 0;

    do {
      const params = onlyActive ? { q: 'enabled:true' } : {};
      const newUsers = await this.getUsersWithPagination(users.length, 500, params);

      users = [...users, ...newUsers];

      usersCount = newUsers.length;
    } while (usersCount > 0);

    return users;
  }

  private getUsersWithPagination(first: number, max: number = 500, params = {}) {
    const defaultParams = { first, max };

    return this.keycloak.users.find({ ...defaultParams, ...params });
  }
}
