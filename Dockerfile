# base layer
FROM node:13.12.0-alpine

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# copy whats needed for dependency installation
COPY package.json package-lock.json /usr/src/app/

# install and cache app dependencies
RUN npm install

# copy all files from current directory to docker
COPY webpack.config.js /usr/src/app
COPY app /usr/src/app/app

RUN npm run create
EXPOSE 8080

# start app
CMD ["npm", "run", "start"]