FROM node:14.18.2-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org
RUN yarn
RUN yarn install
COPY ./ .
RUN yarn build


FROM nginx:1.21-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/
COPY default.conf /etc/nginx/nginx.conf

EXPOSE 8999
