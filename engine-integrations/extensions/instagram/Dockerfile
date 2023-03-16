FROM node:16.17.0-bullseye-slim as builder

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:16.17.0-bullseye-slim as runner
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/instagram /usr/src/app/instagram
COPY --from=builder /usr/src/app/schema /usr/src/app/schema
COPY --from=builder /usr/src/app/src/spec.json /usr/src/app/spec.json

WORKDIR /usr/src/app
RUN yarn add jsonpointer form-data ms http-errors object-path function-bind has for-each has-symbols should
EXPOSE 8000

CMD ["node", "instagram/index.js"]
