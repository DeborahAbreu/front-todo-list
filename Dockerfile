FROM node:20.11-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN apk add --no-cache make gcc g++ python3 && \
    npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
