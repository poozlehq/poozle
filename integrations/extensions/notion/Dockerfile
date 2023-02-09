FROM node:16.17.0-bullseye-slim

WORKDIR /usr/src/app

COPY . .

COPY src/notion.json .

RUN yarn

RUN yarn build

EXPOSE 8000

CMD ["node", "index.js"]
