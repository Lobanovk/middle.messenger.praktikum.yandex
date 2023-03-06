FROM node:16.13.1-buster

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
