FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json nodemon.json ./
RUN npm ci

COPY . .

EXPOSE 3333

CMD [ "npm", "start" ]
