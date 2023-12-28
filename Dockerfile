FROM node:18-alpine3.14 as base
WORKDIR /app

FROM base AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install \
  && npm cache clean --force

FROM dependencies as build
WORKDIR /app
COPY . .
RUN npm run build

FROM alpine as prod
RUN apk add --update nodejs
WORKDIR /app
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000
CMD ["node", "./dist/main"]
