FROM node:16

WORKDIR /usr/src/app 

COPY --chown=node:node . .
COPY . . 

RUN npm ci 

USER node
CMD npm start 