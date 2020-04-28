FROM node:8-alpine

WORKDIR /c/Repositories/coronatimes-formsaver

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
