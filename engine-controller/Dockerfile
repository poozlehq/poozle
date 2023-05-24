FROM node:16.17.0-bullseye-slim as builder

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:16.17.0-bullseye as runner

RUN apt update
RUN apt install apt-transport-https ca-certificates curl gnupg lsb-release -y
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt update
RUN apt -y install docker-ce docker-ce-cli containerd.io

ENV NODE_ENV=production
COPY --from=builder /usr/src/app/controller /usr/src/app/controller

WORKDIR /usr/src/app
RUN yarn add body-parser express is-stream@2.0.1 stack-trace@0.0.10 jsonpointer @dabh/diagnostics async logform winston-transport form-data @colors/colors tar path-is-absolute extend tough-cookie combined-stream mime-types uuid@3.4.0 ecc-jsbn ms http-errors object-path function-bind has for-each has-symbols should lodash.snakecase
EXPOSE 3000

CMD ["node", "controller/index.js"]