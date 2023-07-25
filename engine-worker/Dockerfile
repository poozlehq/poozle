FROM node:18-slim

RUN apt-get update \
  && apt-get install -y ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

CMD [ "node", "./lib/worker.js" ]
