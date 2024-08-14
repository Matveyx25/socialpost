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


FROM nginx:1.27 AS run

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /app/build


FROM install AS dev

ENV PORT=80

CMD ["npm", "start"]
