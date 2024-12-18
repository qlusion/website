FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma/schema.prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "preview"]
