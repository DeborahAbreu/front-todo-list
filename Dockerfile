FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY *-lock.yaml ./

RUN apk add --no-cache make gcc g++ python3

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run","start"]