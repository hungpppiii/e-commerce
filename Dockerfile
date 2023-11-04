FROM node:18-alpine

COPY package.json /app/

COPY src/ /app/src/

COPY server.js /app/

WORKDIR /app

RUN yarn

EXPOSE 3030

CMD [ "yarn", "start" ]