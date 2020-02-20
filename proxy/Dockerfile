FROM nginx:1.13.11-alpine
RUN ln -fs /usr/share/zoneinfo/Europe/Madrid /etc/localtime

# RUN apk update && apk add nodejs

COPY nginx.conf /etc/nginx/nginx.conf

CMD nginx -g 'daemon off;'