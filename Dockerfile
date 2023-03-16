FROM nginx:1.21-alpine

MAINTAINER lc

COPY dist/  /usr/share/nginx/html/

COPY default.conf /etc/nginx/nginx.conf

EXPOSE 8080