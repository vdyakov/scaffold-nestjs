import * as z from 'zod';

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

export const OptionsObject = z.object({
  _: z.string().array(),
  skipInstall: z.boolean().optional(),
  interactive: z.boolean().optional(),
  projectName: z.string().optional(),
  shouldOverwrite: z.boolean().optional(),
  database: z.nativeEnum(DatabaseValue).optional(),
  orm: z.nativeEnum(OrmValue).optional(),
  needAuth: z.boolean().optional(),
  auth: z.nativeEnum(AuthValue).optional(),
  services: z.nativeEnum(ServicesValue).array().optional(),
});

export type Options = z.infer<typeof OptionsObject>;
