FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3005

CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma  && npm run start:prod"]