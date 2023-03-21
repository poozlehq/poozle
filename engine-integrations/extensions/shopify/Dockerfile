FROM node:16.17.0-bullseye-slim as builder

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:16.17.0-bullseye-slim as runner
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/shopify /usr/src/app/shopify
COPY --from=builder /usr/src/app/schema /usr/src/app/schema
COPY --from=builder /usr/src/app/src/spec.json /usr/src/app/spec.json

WORKDIR /usr/src/app

# There is an issue with globby latest version https://github.com/sindresorhus/globby/issues/193
RUN yarn add jsonpointer form-data ms http-errors object-path function-bind has for-each has-symbols should resolve-from globby@11.0.4 p-limit@3.1.0 common-tags
EXPOSE 8000

CMD ["node", "shopify/index.js"]
