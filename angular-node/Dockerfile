FROM node:24

WORKDIR /server/
COPY ./server/ .
COPY ./posts-app/ /tmp/posts-app/
WORKDIR /tmp/posts-app/
RUN npm install && \
npm run build && \
mkdir /server/browser/ && \
mv ./dist/posts-app/browser/* /server/browser/ && \
npm install -g ts-node@10.9.2
WORKDIR /server/
RUN npm install

ENTRYPOINT ts-node src/app.ts
