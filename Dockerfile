FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy package and install dependencies
COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

# Bundle app source
COPY server.js index.html ./

EXPOSE 3000
CMD [ "node", "server.js" ]