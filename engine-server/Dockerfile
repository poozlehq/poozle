FROM node:16-alpine AS builder

# Create app directory
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

COPY prisma ./prisma/

# Install app dependencies
RUN yarn

COPY . .

RUN npm run build

FROM node:16-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD [ "npm", "run", "start:migrate:prod" ]