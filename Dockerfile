FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 3030

CMD [ "npm", "start" ]