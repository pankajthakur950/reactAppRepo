FROM node:alpine

WORKDIR ./APIGateway

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "dev:docker"]