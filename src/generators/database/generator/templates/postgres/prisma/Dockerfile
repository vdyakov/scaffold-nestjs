# BUILD FOR LOCAL DEVELOPMENT

FROM node:18-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run prisma:generate

USER node

# BUILD FOR PRODUCTION

FROM node:18-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run prisma:generate
RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

# PRODUCTION

FROM node:18-alpine As production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD [ "node", "dist/main.js" ]
