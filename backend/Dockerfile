FROM node:16.18.0

WORKDIR /usr/src/app/backend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]