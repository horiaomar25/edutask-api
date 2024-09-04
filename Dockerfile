FROM node:18.20.3-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY . .
WORKDIR /app/server

RUN npm install

ENV NODE_ENV=production

EXPOSE 3001

ENV PORT=3001
ENV DB_CONNECTION_STRING="postgres://whaizbiq:XLqK3fF-5Vtv33PeWMIM7vcZ-k_gFA8t@surus.db.elephantsql.com/whaizbiq"

CMD ["npm", "start"]