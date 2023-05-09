# Scaffold Nest.js

## Description

This generator will help you create a Nest.js application. You just need to answer the questions and get a ready-made application template.

### Project Overview

- Nest.js 9
- Eslint
- Docker
- Husky
- Supports MongoDB, MySql, Postgres
- Supports Mongoose, Prisma, TypeORM, MikroORM
- Ability to select services: Keycloak, MinIO and Novu

## Installation

First, generate your new project:

```bash
npx scaffold-nestjs
```

Run your generated application:

```bash
cd <project name>
docker-compose up -d
```

## App skeleton

```bash
├── src
│   ├── database
│   │   ├── migrations
│   │   │   └── ...
│   │   ├── database.config.ts
│   │   └── database-factory.service.ts
│   ├── decorators
│   │   ├── auth-bearer.decorator.ts
│   │   ├── auth.decorator.ts
│   │   ├── roles.decorator.ts
│   │   └── serialization.decorator.ts
│   ├── exceptions
│   │   └── validation.exceptions.ts
│   ├── filters
│   │   ├── all-exceptions.filter.ts
│   │   ├── bad-request-exception.filter.ts
│   │   ├── forbidden-exception.filter.ts
│   │   ├── index.ts
│   │   ├── not-found-exception.filter.ts
│   │   ├── unauthorized-exception.filter.ts
│   │   └── validation-exceptions.filter.ts
│   ├── guards
│   │   ├── jwt-access.guard.ts
│   │   ├── jwt-refresh.guard.ts
│   │   └── roles.guard.ts
│   ├── interceptors
│   │   ├── serialization.interceptor.ts
│   │   └── wrap-response.interceptor.ts
│   ├── interfaces
│   │   └── exception-response.interface.ts
│   ├── modules
│   │   ├── auth
│   │   │   ├── dtos
│   │   │   │   ├── jwt-token.dto.ts
│   │   │   │   ├── refresh-token.dto.ts
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── signup.dto.ts
│   │   │   ├── interfaces
│   │   │   │   ├── decoded-user.interface.ts
│   │   │   │   ├── jwt-strategy-validate.interface.ts
│   │   │   │   ├── login-payload.interface.ts
│   │   │   │   └── validate-user-output.interface.ts
│   │   │   └── strategies
│   │   │   │   ├── jwt-access.strategy.ts
│   │   │   │   ├── jwt-refresh.strategy.ts
│   │   │   │   └── public.strategy.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.repository.ts
│   │   │   └── auth.service.ts
│   │   └── user
│   │       ├── dtos
│   │       │   ├── update-user.dto.ts
│   │       │   └── user-response.dto.ts
│   │       ├── user.entity.ts
│   │       ├── user.controller.ts
│   │       ├── user.module.ts
│   │       ├── user.repository.ts
│   │       └── user.service.ts
│   ├── shared
│   │   ├── services
│   │   │   ├── api-config.service.ts
│   │   │   ├── keycloak.service.ts
│   │   │   ├── minio.service.ts
│   │   │   └── novu.service.ts
│   │   └── shared.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .dockerignore
├── .env
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

## Links

Swagger documentation will be available on route:

```bash
http://localhost:3000/api
```
