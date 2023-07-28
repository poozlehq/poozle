FROM node:18-slim

RUN apt-get update \
  && apt-get install -y ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN apt-get update && apt-get install curl -y
RUN curl -L https://github.com/cloudquery/cloudquery/releases/download/cli-v3.11.0/cloudquery_linux_amd64 -o cloudquery
RUN chmod a+x cloudquery

COPY . .

RUN yarn

RUN yarn build

CMD [ "node", "./lib/worker.js" ]
