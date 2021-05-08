FROM node:lts-alpine

RUN mkdir -p /srv/app
WORKDIR /srv/app

COPY package.json /srv/app/package.json
RUN npm install --production