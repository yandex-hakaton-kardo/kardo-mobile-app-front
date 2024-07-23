FROM node:20-alpine3.18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

FROM nginx:1.24.0-alpine-slim AS server

COPY --from=builder /app/dist /app

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
