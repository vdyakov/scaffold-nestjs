# Nest.js generator

## Description

This generator will help you create a Nest.js application. You just need to answer the questions and get a ready-made application template.

### Project Overview

- Nest.js 9
- Eslint
- Docker
- Husky
- Supports MongoDB, MySql, Postgres
- Supports Mongoose, Prisma, TypeORM, MikroORM

## Installation

First, build the generator:

```bash
npm install
npm run build
```

Then generate your new project:

```bash
npm run generate
```

Run your generated application:

```bash
cd <project name>
docker-compose up -d
```

## Links

Swagger documentation will be available on route:

```bash
http://localhost:3000/api
```
