FROM node:14 AS builder

ARG API_URL
ENV REACT_APP_API_URL=$API_URL

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY ./public ./public
COPY ./src ./src
COPY ./.env ./.env
RUN npm run build

FROM node:14 AS runner

RUN npm install --global http-server

COPY --from=builder /app/build /app/build
RUN mv /app/build/index.html /app/build/404.html

CMD ["http-server", "/app/build", "-p 80"]
