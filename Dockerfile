FROM node:lts

RUN mkdir -p /srv/app
WORKDIR /srv/app

COPY package.json /srv/app/package.json
RUN npm install --production

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait