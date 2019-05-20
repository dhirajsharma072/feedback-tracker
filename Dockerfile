FROM node:10
ARG NODE_ENV

# install dependencies
RUN apt-get update -y \
    apt-get install -y 


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# npm install
COPY package.json .

RUN npm install --verbose

# grant write persmission to app folder
RUN chmod -R 777 /usr/src/app

CMD ["npm", "run", "start"]
