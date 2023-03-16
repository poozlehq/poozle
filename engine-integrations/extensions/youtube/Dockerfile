FROM node:18-bullseye-slim as builder

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:18-bullseye-slim as runner
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/youtube /usr/src/app/youtube
COPY --from=builder /usr/src/app/schema /usr/src/app/schema
COPY --from=builder /usr/src/app/src/spec.json /usr/src/app/spec.json

WORKDIR /usr/src/app
RUN yarn add jsonpointer form-data ms http-errors object-path function-bind has for-each has-symbols should ajv graphql json-pointer lodash.get lodash.merge lodash.keys lodash.xor lodash.isequal fetch
EXPOSE 8000

CMD ["node", "youtube/index.js"]
