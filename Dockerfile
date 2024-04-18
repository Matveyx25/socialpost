FROM node:14 AS install

ARG API_URL
ENV REACT_APP_API_URL=$API_URL

WORKDIR /app
COPY package*.json ./

RUN npm install


FROM install AS builder

COPY ./public ./public
COPY ./src ./src
COPY ./.env ./.env
RUN npm run build


FROM node:14 AS runner

RUN npm install --global http-server

COPY --from=builder /app/build /app/build
RUN mv /app/build/index.html /app/build/404.html

CMD ["http-server", "/app/build", "-p 80"]


FROM install AS dev

ENV PORT=80

CMD ["npm", "start"]

