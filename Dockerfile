FROM node:20.12-alpine3.18

WORKDIR /app

COPY ./server/package*.json .

RUN npm install

COPY ./server/tsconfig*.json .

COPY ./server/nest-cli.json .

COPY ./server/src ./src

RUN npm run build

CMD [ "npm", "run", "start" ]