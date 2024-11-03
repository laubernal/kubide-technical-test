FROM node:20.12-alpine3.18

WORKDIR /app

COPY ./server/package*.json .

RUN npm install

COPY ./server/tsconfig*.json .

COPY ./server/nest-cli.json .

COPY ./server/src src

COPY ./server/.env .

COPY ./server/typeorm typeorm

RUN npm run build

CMD [ "npm", "run", "start" ]