FROM node:16.17.0-bullseye

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

WORKDIR /usr/src/app
EXPOSE 8000

CMD ["node", "github/index.js"]
