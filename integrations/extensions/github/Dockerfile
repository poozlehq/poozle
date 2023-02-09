FROM node:16.17.0-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

COPY public/app.js ./

RUN yarn add express

EXPOSE 8000

CMD ["node", "app.js"]
