FROM node:18.20.3-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY . .
WORKDIR /app/server

RUN npm install

ENV NODE_ENV=production

EXPOSE 3001

ENV PORT=3001
ENV DB_CONNECTION_STRING="postgresql://postgres.cpvapqgczpzavhzknyfv:DwnWaf9MB63GrO9g@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"

CMD ["npm", "start"]