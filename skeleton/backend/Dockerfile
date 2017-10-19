FROM node:latest
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN yarn install
EXPOSE 3000
CMD [ "yarn", "lint" ]
CMD [ "yarn", "test" ]
CMD [ "yarn", "start" ]
