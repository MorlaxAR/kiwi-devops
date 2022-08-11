FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy package and install dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY src/* ./

EXPOSE 3000
CMD [ "node", "index.js" ]