FROM node:lts-alpine3.16 as build-stage

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# FROM --platform=linux/amd64 node:lts-alpine as production-stage
# COPY --from=build-stage /app/dist /app

# # install simple http server for serving static content
# RUN npm install -g http-server

# EXPOSE 8000

# http-server --port 8000 -P http://localhost:8000/index.html ./dist/
# CMD [ "http-server", "app", "--port", "8000", "--proxy", "http://localhost:8000?" ]

FROM --platform=linux/amd64 nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
