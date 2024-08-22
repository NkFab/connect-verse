FROM node:lts-alpine as production

WORKDIR /usr/src/app

RUN mkdir files
RUN chmod -R  755 files/

COPY package.json .

RUN npm i --openssl-legacy-provider

COPY . .
COPY ./.env . 

ENV NODE_ENV=production

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/index.js"]
