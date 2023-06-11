export enum DatabaseValue {
  MongoDB = 'mongo',
  MySql = 'mysql',
  Postgres = 'postgres',
}

export enum OrmValue {
  Mongoose = 'mongoose',
  Prisma = 'prisma',
  MikroORM = 'mikroorm',
  TypeORM = 'typeorm',
}

export enum AuthValue {
  JWT = 'jwt',
}

export enum ServicesValue {
  Keycloak = 'keycloak',
  MinIO = 'minio',
  Novu = 'novu',
}

export interface Options {
  _: string[],
  skipInstall?: boolean,
  interactive?: boolean,
  projectName?: string,
  shouldOverwrite?: boolean,
  database?: DatabaseValue,
  orm?: OrmValue,
  needAuth?: boolean,
  auth?: AuthValue,
  services?: ServicesValue[],

  [key: string]: string | boolean | string[] | undefined,
}
