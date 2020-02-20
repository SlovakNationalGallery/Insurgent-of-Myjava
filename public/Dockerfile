FROM node:11.11.0-alpine

RUN ln -fs /usr/share/zoneinfo/Europe/Madrid /etc/localtime

WORKDIR /public
COPY package.json .
RUN npm install

COPY . /public

CMD npm run dev