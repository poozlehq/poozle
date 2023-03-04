FROM node:16.17.0-bullseye-slim as builder

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:16.17.0-bullseye-slim as runner
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/controller /usr/src/app/controller

WORKDIR /usr/src/app
RUN yarn add body-parser express is-stream@2.0.1 stack-trace@0.0.10 jsonpointer @dabh/diagnostics async logform winston-transport form-data @colors/colors tar path-is-absolute extend tough-cookie combined-stream mime-types uuid@3.4.0 ecc-jsbn ms http-errors object-path function-bind has for-each has-symbols should
EXPOSE 3000

CMD ["node", "controller/index.js"]