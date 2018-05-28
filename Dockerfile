FROM node:carbon

COPY . /express
WORKDIR express

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]
