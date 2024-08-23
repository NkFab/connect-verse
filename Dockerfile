FROM node:lts-alpine as production

WORKDIR /app

COPY config/ ./

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 9000

CMD ["node", "dist/index.js"]
