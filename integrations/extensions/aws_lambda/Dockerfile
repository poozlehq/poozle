FROM node:16.17.0-bullseye-slim

WORKDIR /usr/src/app

COPY . .

COPY src/aws_lambda.json .

RUN yarn

RUN yarn build

EXPOSE 8000

CMD ["node", "index.js"]
