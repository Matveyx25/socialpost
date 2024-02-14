FROM node:14 AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine as runner
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE  81
CMD ["nginx", "-g", "daemon off;"]