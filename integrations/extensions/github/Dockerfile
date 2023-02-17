FROM node:16.17.0-bullseye-slim as builder

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:16.17.0-bullseye-slim as runner
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/github /usr/src/app/github
COPY --from=builder /usr/src/app/schema /usr/src/app/schema

WORKDIR /usr/src/app
RUN yarn add jsonpointer form-data ms http-errors object-path function-bind has for-each has-symbols should
EXPOSE 8000

CMD ["node", "github/index.js"]
