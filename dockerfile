FROM node:14.15.3
WORKDIR /usr/src/app
# COPY app/package.json .
# COPY app/yarn.lock .
RUN yarn install
COPY . .