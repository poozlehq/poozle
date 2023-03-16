FROM node:16.17.0-bullseye-slim as builder

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:16.17.0-bullseye-slim as runner
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/google_api_gateway /usr/src/app/google_api_gateway
COPY --from=builder /usr/src/app/schema /usr/src/app/schema
COPY --from=builder /usr/src/app/src/spec.json /usr/src/app/spec.json

WORKDIR /usr/src/app
RUN yarn add jsonpointer form-data ms http-errors object-path function-bind has for-each has-symbols should
EXPOSE 8000

CMD ["node", "google_api_gateway/index.js"]
