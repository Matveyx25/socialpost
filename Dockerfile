FROM node:14 AS install

WORKDIR /app
COPY package*.json ./

RUN npm install


FROM install AS builder

ARG API_URL
ENV REACT_APP_API_URL=$API_URL

COPY ./public ./public
COPY ./src ./src
COPY ./.env ./.env
RUN npm run build


FROM node:14 AS run

RUN npm install --global http-server

COPY --from=builder /app/build /app/build

CMD ["http-server", "/app/build", "-p 80"]


FROM install AS dev

ENV PORT=80

CMD ["npm", "start"]
