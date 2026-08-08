FROM node:20-alpine

# Prismaの動作に必要な OpenSSL などの依存パッケージをインストール
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["sh", "-c", "npx prisma generate && npm run dev"]